// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC777.sol';
import './interfaces/IERC777Recipient.sol';
import './interfaces/IERC777Sender.sol';
import './interfaces/IERC20.sol';
import '../utils/Address.sol';
import './utils/Context.sol';
import '../utils/SafeMath.sol';
import '../interfaces/IERC1820Registry.sol';
import '../hyperverse/IHyperverseModule.sol';
import '../hyperverse/Initializable.sol';

/**
 * @dev Implementation of the {IERC777} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 *
 * Support for ERC20 is included in this contract, as specified by the EIP: both
 * the ERC777 and ERC20 interfaces can be safely used when interacting with it.
 * Both {IERC777-Sent} and {IERC20-Transfer} events are emitted on token
 * movements.
 *
 * Additionally, the {IERC777-granularity} value is hard-coded to `1`, meaning that there
 * are no special restrictions in the amount of tokens that created, moved, or
 * destroyed. This makes integration with ERC20 applications seamless.
 */
contract ERC777 is Context, IERC777, IERC20, IHyperverseModule, Initializable {
	using Address for address;
	using SafeMath for uint256;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	address public immutable owner;
	address private _tenantOwner;
	
	IERC1820Registry internal constant _ERC1820_REGISTRY =
		IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

	mapping(address => uint256) private _balances;

	uint256 public override(IERC20, IERC777) totalSupply;

	string public override name;
	string public override symbol;

	bytes32 private constant _TOKENS_SENDER_INTERFACE_HASH = keccak256('ERC777TokensSender');
	bytes32 private constant _TOKENS_RECIPIENT_INTERFACE_HASH = keccak256('ERC777TokensRecipient');

	// This isn't ever read from - it's only used to respond to the defaultOperators query.
	address[] private _defaultOperatorsArray;

	// Immutable, but accounts may revoke them (tracked in __revokedDefaultOperators).
	mapping(address => bool) private _defaultOperators;

	// For each account, a mapping of its operators and revoked default operators.
	mapping(address => mapping(address => bool)) private _operators;
	mapping(address => mapping(address => bool)) private _revokedDefaultOperators;

	// ERC20-allowances
	mapping(address => mapping(address => uint256)) private _allowances;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unauthorized();
	error AlreadyInitialized();
	error ZeroAddress();
	error InsufficientBalance();
	error InsufficientAllowance();
	error SameAddress();
	error AuthorizingSelf();
	error RevokingSelf();
	error UnauthorizedOperator();
	error MissingERC777TokensRecipient();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	modifier isTenantOwner() {
		if (msg.sender != _tenantOwner) {
			revert Unauthorized();
		}
		_;
	}

	modifier canInitialize(address _tenant) {
		if (_tenantOwner != address(0)) {
			revert AlreadyInitialized();
		}
		_;
	}

	modifier addressCheck(address _from, address _to) {
		if (_from == _to) {
			revert SameAddress();
		}

		if (_to == address(0) || _from == address(0)) {
			revert ZeroAddress();
		}
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'ERC777',
			Author(_owner, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
		owner = _owner;
		// TO DO: Not sure if I should register the master ERC777
		_ERC1820_REGISTRY.setInterfaceImplementer(
			address(this),
			keccak256('ERC777Token'),
			address(this)
		);
		_ERC1820_REGISTRY.setInterfaceImplementer(
			address(this),
			keccak256('ERC20Token'),
			address(this)
		);
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	/**
	 * @dev `defaultOperators` may be an empty array.
	 */
	function initialize(
		string memory _name,
		string memory _symbol,
		address[] memory defaultOperators_,
		uint256 _initialSupply,
		address _tenant
	) external initializer canInitialize(_tenant) {
		name = _name;
		symbol = _symbol;
		_defaultOperatorsArray = defaultOperators_;
		for (uint256 i = 0; i < defaultOperators_.length; i++) {
			_defaultOperators[defaultOperators_[i]] = true;
		}

		_defaultOperatorsArray.push(address(this));
		_defaultOperators[address(this)] = true;

		// register interfaces of clone contract
		_ERC1820_REGISTRY.setInterfaceImplementer(
			address(this),
			keccak256('ERC777Token'),
			address(this)
		);
		_ERC1820_REGISTRY.setInterfaceImplementer(
			address(this),
			keccak256('ERC20Token'),
			address(this)
		);

		_mint(_tenant, _initialSupply, '', '');
		_tenantOwner = _tenant;
	}

	/**
	 * @dev See {ERC20-decimals}.
	 *
	 * Always returns 18, as per the
	 * [ERC777 EIP](https://eips.ethereum.org/EIPS/eip-777#backward-compatibility).
	 */
	function decimals() public pure virtual returns (uint8) {
		return 18;
	}

	/**
	 * @dev See {IERC777-granularity}.
	 *
	 * This implementation always returns `1`.
	 */
	function granularity() public view virtual override returns (uint256) {
		return 1;
	}

	/**
	 * @dev Returns the amount of tokens owned by an account (`tokenHolder`).
	 */
	function balanceOf(address tokenHolder)
		public
		view
		virtual
		override(IERC20, IERC777)
		returns (uint256)
	{
		return _balances[tokenHolder];
	}

	/**
	 * @dev See {IERC777-send}.
	 *
	 * Also emits a {IERC20-Transfer} event for ERC20 compatibility.
	 */
	function send(
		address _to,
		uint256 _amount,
		bytes memory _data
	) public virtual override addressCheck(msg.sender, _to) {
		if (balanceOf(msg.sender) < _amount) {
			revert InsufficientBalance();
		}
		_send(_msgSender(), _to, _amount, _data, '', true);
	}

	/**
	 * @dev See {IERC20-transfer}.
	 *
	 * Unlike `send`, `recipient` is _not_ required to implement the {IERC777Recipient}
	 * interface if it is a contract.
	 *
	 * Also emits a {Sent} event.
	 */
	function transfer(address _to, uint256 _amount)
		public
		virtual
		override
		addressCheck(msg.sender, _to)
		returns (bool)
	{
		address from = _msgSender();

		if (balanceOf(from) < _amount) {
			revert InsufficientBalance();
		}

		_callTokensToSend(from, from, _to, _amount, '', '');

		_move(from, from, _to, _amount, '', '');

		_callTokensReceived(from, from, _to, _amount, '', '', false);

		return true;
	}

	/**
	 * @dev See {IERC20-transferFrom}.
	 *
	 * Note that operator and allowance concepts are orthogonal: operators cannot
	 * call `transferFrom` (unless they have allowance), and accounts with
	 * allowance cannot call `operatorSend` (unless they are operators).
	 *
	 * Emits {Sent}, {IERC20-Transfer} and {IERC20-Approval} events.
	 */
	function transferFrom(
		address _from,
		address _to,
		uint256 _amount
	) public virtual override addressCheck(_from, _to) returns (bool) {
		address spender = _msgSender();
		uint256 currentAllowance = _allowances[_from][spender];

		if (_allowances[_from][_msgSender()] < _amount) {
			revert InsufficientAllowance();
		}

		_callTokensToSend(spender, _from, _to, _amount, '', '');

		_move(spender, _from, _to, _amount, '', '');

		_approve(_from, spender, currentAllowance - _amount);

		_callTokensReceived(spender, _from, _to, _amount, '', '', false);

		return true;
	}

	/**
	 * @dev See {IERC20-allowance}.
	 *
	 * Note that operator and allowance concepts are orthogonal: operators may
	 * not have allowance, and accounts with allowance may not be operators
	 * themselves.
	 */
	function allowance(address _owner, address _spender)
		public
		view
		virtual
		override
		returns (uint256)
	{
		return _allowances[_owner][_spender];
	}

	/**
	 * @dev See {IERC20-approve}.
	 *
	 * Note that accounts cannot have allowance issued by their operators.
	 */
	function approve(address _spender, uint256 _amount)
		public
		virtual
		override
		addressCheck(msg.sender, _spender)
		returns (bool)
	{
		address holder = _msgSender();
		
		if (balanceOf(holder) < _amount) {
			revert InsufficientBalance();
		}

		_approve(holder, _spender, _amount);
		return true;
	}

	/**
	 * @dev See {IERC777-defaultOperators}.
	 */
	function defaultOperators() public view virtual override returns (address[] memory) {
		return _defaultOperatorsArray;
	}

	/**
	 * @dev See {IERC777-isOperatorFor}.
	 */
	function isOperatorFor(address _operator, address _tokenHolder)
		public
		view
		virtual
		override
		returns (bool)
	{
		return
			_operator == _tokenHolder ||
			(_defaultOperators[_operator] && !_revokedDefaultOperators[_tokenHolder][_operator]) ||
			_operators[_tokenHolder][_operator];
	}

	/**
	 * @dev See {IERC777-authorizeOperator}.
	 */
	function authorizeOperator(address _operator) public virtual override isTenantOwner {
		if (_msgSender() == _operator) {
			revert AuthorizingSelf();
		}

		if (_defaultOperators[_operator]) {
			delete _revokedDefaultOperators[_msgSender()][_operator];
		} else {
			_operators[_msgSender()][_operator] = true;
		}

		emit AuthorizedOperator(_operator, _msgSender());
	}

	/**
	 * @dev See {IERC777-revokeOperator}.
	 */
	function revokeOperator(address _operator) public virtual override isTenantOwner {
		if (_msgSender() == _operator) {
			revert RevokingSelf();
		}

		if (_defaultOperators[_operator]) {
			_revokedDefaultOperators[_msgSender()][_operator] = true;
		} else {
			delete _operators[_msgSender()][_operator];
		}

		emit RevokedOperator(_operator, _msgSender());
	}

	/**
	 * @dev See {IERC777-operatorSend}.
	 *
	 * Emits {Sent} and {IERC20-Transfer} events.
	 */
	function operatorSend(
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _data,
		bytes memory _operatorData
	) public virtual override {
		if (!isOperatorFor(_msgSender(), _from)) {
			revert UnauthorizedOperator();
		}

		if (balanceOf(_from) < _amount) {
			revert InsufficientBalance();
		}

		_send(_from, _to, _amount, _data, _operatorData, true);
	}

	/**
	 * @dev See {IERC777-operatorBurn}.
	 *
	 * Emits {Burned} and {IERC20-Transfer} events.
	 */
	function operatorBurn(
		address _owner,
		uint256 _amount,
		bytes memory _data,
		bytes memory _operatorData
	) public virtual override {
		if (!isOperatorFor(_msgSender(), _owner)) {
			revert UnauthorizedOperator();
		}

		if (balanceOf(_owner) < _amount) {
			revert InsufficientBalance();
		}

		_burn(_owner, _amount, _data, _operatorData);
	}

	/**
	 * @dev See {IERC777-burn}.
	 *
	 * Also emits a {IERC20-Transfer} event for ERC20 compatibility.
	 */
	function burn(uint256 _amount, bytes memory _data) public virtual override {
		if (balanceOf(msg.sender) < _amount) {
			revert InsufficientBalance();
		}

		_burn(_msgSender(), _amount, _data, '');
	}

	function operatorMint(
		address _owner,
		uint256 _amount,
		bytes memory _data,
		bytes memory _operatorData
	) public virtual {
		if (!isOperatorFor(_msgSender(), _owner)) {
			revert UnauthorizedOperator();
		}

		_mint(_owner, _amount, _data, _operatorData);
	}

	/** @dev Creates `amount` tokens and assigns them to _tenantOwner, increasing
	 * the total supply.
	 *
	 * Emits a {Transfer} event with `from` set to the zero address.
	 *
	 * @param _amount The address which will spend the funds.
	 */
	function mint(uint256 _amount) external isTenantOwner {
		_mint(msg.sender, _amount, '', '');
	}

	/**
	 * @dev Creates `amount` tokens and assigns them to `account`, increasing
	 * the total supply.
	 *
	 * If a send hook is registered for `account`, the corresponding function
	 * will be called with `operator`, `data` and `operatorData`.
	 *
	 * See {IERC777Sender} and {IERC777Recipient}.
	 *
	 * Emits {Minted} and {IERC20-Transfer} events.
	 *
	 * Requirements
	 *
	 * - `account` cannot be the zero address.
	 * - if `account` is a contract, it must implement the {IERC777Recipient}
	 * interface.
	 */
	function _mint(
		address _owner,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData
	) internal virtual {
		_mint(_owner, _amount, _userData, _operatorData, true);
	}

	/**
	 * @dev Creates `amount` tokens and assigns them to `account`, increasing
	 * the total supply.
	 *
	 * If `requireReceptionAck` is set to true, and if a send hook is
	 * registered for `account`, the corresponding function will be called with
	 * `operator`, `data` and `operatorData`.
	 *
	 * See {IERC777Sender} and {IERC777Recipient}.
	 *
	 * Emits {Minted} and {IERC20-Transfer} events.
	 *
	 * Requirements
	 *
	 * - `account` cannot be the zero address.
	 * - if `account` is a contract, it must implement the {IERC777Recipient}
	 * interface.
	 */
	function _mint(
		address _owner,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData,
		bool _requireReceptionAck
	) internal virtual {
		if (_owner == address(0)) {
			revert ZeroAddress();
		}

		address operator = _msgSender();

		_beforeTokenTransfer(operator, address(0), _owner, _amount);

		totalSupply = totalSupply.add(_amount);
		_balances[_owner] = _balances[_owner].add(_amount);

		_callTokensReceived(
			operator,
			address(0),
			_owner,
			_amount,
			_userData,
			_operatorData,
			_requireReceptionAck
		);

		emit Minted(operator, _owner, _amount, _userData, _operatorData);
		emit Transfer(address(0), _owner, _amount);
	}

	/**
	 * @dev Send tokens
	 * @param _from address token holder address
	 * @param _to address recipient address
	 * @param _amount uint256 amount of tokens to transfer
	 * @param _userData bytes extra information provided by the token holder (if any)
	 * @param _operatorData bytes extra information provided by the operator (if any)
	 * @param _requireReceptionAck if true, contract recipients are required to implement ERC777TokensRecipient
	 */
	function _send(
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData,
		bool _requireReceptionAck
	) internal virtual addressCheck(_from, _to) {
		address operator = _msgSender();

		_callTokensToSend(operator, _from, _to, _amount, _userData, _operatorData);

		_move(operator, _from, _to, _amount, _userData, _operatorData);

		_callTokensReceived(
			operator,
			_from,
			_to,
			_amount,
			_userData,
			_operatorData,
			_requireReceptionAck
		);
	}

	/**
	 * @dev Burn tokens
	 * @param _from address token holder address
	 * @param _amount uint256 amount of tokens to burn
	 * @param _data bytes extra information provided by the token holder
	 * @param _operatorData bytes extra information provided by the operator (if any)
	 */
	function _burn(
		address _from,
		uint256 _amount,
		bytes memory _data,
		bytes memory _operatorData
	) internal virtual {
		if (_from == address(0)) {
			revert ZeroAddress();
		}
		uint256 fromBalance = _balances[_from];

		address operator = _msgSender();

		_callTokensToSend(operator, _from, address(0), _amount, _data, _operatorData);

		_beforeTokenTransfer(operator, _from, address(0), _amount);

		unchecked {
			_balances[_from] = fromBalance.sub(_amount);
		}
		
		totalSupply = totalSupply.sub(_amount);

		emit Burned(operator, _from, _amount, _data, _operatorData);
		emit Transfer(_from, address(0), _amount);
	}

	function _move(
		address _operator,
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData
	) private {
		_beforeTokenTransfer(_operator, _from, _to, _amount);

		uint256 fromBalance = _balances[_from];

		unchecked {
			_balances[_from] = fromBalance.sub(_amount);
		}
		_balances[_to] = _balances[_to].add(_amount);

		emit Sent(_operator, _from, _to, _amount, _userData, _operatorData);
		emit Transfer(_from, _to, _amount);
	}

	/**
	 * @dev See {ERC20-_approve}.
	 *
	 * Note that accounts cannot have allowance issued by their operators.
	 */
	function _approve(
		address _owner,
		address _spender,
		uint256 _value
	) internal addressCheck(_owner, _spender) {
		_allowances[_owner][_spender] = _value;
		emit Approval(_owner, _spender, _value);
	}

	/**
	 * @dev Call from.tokensToSend() if the interface is registered
	 * @param _operator address operator requesting the transfer
	 * @param _from address token holder address
	 * @param _to address recipient address
	 * @param _amount uint256 amount of tokens to transfer
	 * @param _userData bytes extra information provided by the token holder (if any)
	 * @param _operatorData bytes extra information provided by the operator (if any)
	 */
	function _callTokensToSend(
		address _operator,
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData
	) private {
		address implementer = _ERC1820_REGISTRY.getInterfaceImplementer(
			_from,
			_TOKENS_SENDER_INTERFACE_HASH
		);
		if (implementer != address(0)) {
			IERC777Sender(implementer).tokensToSend(
				_operator,
				_from,
				_to,
				_amount,
				_userData,
				_operatorData
			);
		}
	}

	/**
	 * @dev Call to.tokensReceived() if the interface is registered. Reverts if the recipient is a contract but
	 * tokensReceived() was not registered for the recipient
	 * @param _operator address operator requesting the transfer
	 * @param _from address token holder address
	 * @param _to address recipient address
	 * @param _amount uint256 amount of tokens to transfer
	 * @param _userData bytes extra information provided by the token holder (if any)
	 * @param _operatorData bytes extra information provided by the operator (if any)
	 * @param _requireReceptionAck if true, contract recipients are required to implement ERC777TokensRecipient
	 */
	function _callTokensReceived(
		address _operator,
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData,
		bool _requireReceptionAck
	) private {
		address implementer = _ERC1820_REGISTRY.getInterfaceImplementer(
			_to,
			_TOKENS_RECIPIENT_INTERFACE_HASH
		);
		if (implementer != address(0)) {
			IERC777Recipient(implementer).tokensReceived(
				_operator,
				_from,
				_to,
				_amount,
				_userData,
				_operatorData
			);
		} else if (_requireReceptionAck) {
			if (_to.isContract()) {
				revert MissingERC777TokensRecipient();
			}
		}
	}

	/**
	 * @dev Hook that is called before any token transfer. This includes
	 * calls to {send}, {transfer}, {operatorSend}, minting and burning.
	 *
	 * Calling conditions:
	 *
	 * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
	 * will be to transferred to `to`.
	 * - when `from` is zero, `amount` tokens will be minted for `to`.
	 * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
	 * - `from` and `to` are never both zero.
	 *
	 * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
	 */
	function _beforeTokenTransfer(
		address _operator,
		address _from,
		address _to,
		uint256 _amount
	) internal virtual {}
}
