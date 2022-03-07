// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './hyperverse/IHyperverseModule.sol';
import './interfaces/IERC777.sol';
import './interfaces/IERC20.sol';
import './utils/Address.sol';
import './utils/SafeMath.sol';
import './interfaces/IERC1820Registry.sol';
import './interfaces/IERC777Sender.sol';
import './interfaces/IERC777Recipient.sol';

contract ERC777 is IHyperverseModule, IERC777, IERC20 {
	using SafeMath for uint256;
	using Address for address;

	IERC1820Registry internal constant _ERC1820_REGISTRY =
		IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	string public override name;
	string public override symbol;
	uint256 public total;

	mapping(address => uint256) public balances;

	bytes32 private constant _TOKENS_SENDER_INTERFACE_HASH = keccak256('ERC777TokensSender');
	bytes32 private constant _TOKENS_RECIPIENT_INTERFACE_HASH = keccak256('ERC777TokensRecipient');

	address[] private defaultOperatorsArr;
	address public immutable contractOwner;
	address private tenantOwner;

	mapping(address => bool) private _defaultOperators;
    mapping(address => mapping(address => bool)) private _operators;
    mapping(address => mapping(address => bool)) private _revokedOperators;

	mapping(address => mapping(address => uint256)) private _allowances;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
	modifier isTenantOwner() {
		require(msg.sender == tenantOwner, 'You are not the tenant owner');
		_;
	}

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'ERC777',
			Author(_owner, 'https://externallink.net'),
			'1.0.0',
			3479831479814,
			'https://externallink.net'
		);
		contractOwner = _owner;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TENANT FUNCTIONALITIES  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	/**
	 * @dev Function to initialize a new tenant instance of the ERC777 contract.
	 * @param _name Name of token
	 * @param _symbol Symbol of token
	 * @param _defaultOperatorsArr Default operators of the token
	 * @param _initialSupply Initial supply of the token
	 * @param _tenant The address of the tenant creating the instance
	 */
	function init(
		string memory _name,
		string memory _symbol,
		address[] memory _defaultOperatorsArr,
		uint256 _initialSupply,
		address _tenant
	) external {
		require(tenantOwner == address(0), 'Contract is already initialized');
		name = _name;
		symbol = _symbol;
		total = _initialSupply;
		balances[_tenant] = _initialSupply;

		defaultOperatorsArr = _defaultOperatorsArr;
		for (uint256 i = 0; i < _defaultOperatorsArr.length; i++) {
			_defaultOperators[_defaultOperatorsArr[i]] = true;
		}

		// register interfaces
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

		tenantOwner = _tenant;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IERC777 IMPLEMENTATION  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    function totalSupply() public view virtual override(IERC20, IERC777) returns (uint256) {
        return total;
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
	 * @dev Granularity value is hard-coded to `1`, meaning that there
	 * are no special restrictions in the amount of tokens that created, moved, or
	 * destroyed. This makes integration with ERC20 applications seamless. */
	function granularity() public view virtual override returns (uint256) {
		return 1;
	}

	/**
	 * @dev Returns the amount of tokens owned by an account (`_account`).
	 *
	 * @param _account The address of the account to query.
	 */
	function balanceOf(address _account)
		public
		view
		virtual
		override(IERC20, IERC777)
		returns (uint256)
	{
		return balances[_account];
	}

	/**
	 * @dev Returns the default operators of this instance.
	 */
	function defaultOperators() public view virtual override returns (address[] memory) {
		return defaultOperatorsArr;
	}

	/**
	 * @dev Sends `_amount` of tokens to `_to` passing `_data` to the recipient
	 * @param _to The address of the recipient
	 * @param _amount The number of tokens to be sent
	 *
	 * Also emits a {IERC20-Transfer} event for ERC20 compatibility.
	 */
	function send(
		address _to,
		uint256 _amount,
		bytes calldata _data
	) external override {
		_send(msg.sender, _to, _amount, _data, '', true);
	}

	/** @dev Creates `amount` tokens and assigns them to tenantOwner, increasing
	 * the total supply.
	 *
	 * Emits a {Transfer} event with `from` set to the zero address.
	 *
	 * @param _amount The address which will spend the funds.
	 */
	function mint(
		address _account,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData
	) public isTenantOwner {
		_mint(_account, _amount, _userData, _operatorData, true);
	}

	/**
	 * @dev Destroys `amount` tokens from the caller's account, reducing the
	 * total supply.
	 *
	 * @param _amount The number of tokens to be sent
	 * @param _data The data generated by the user to be passed to the recipient
	 * Also emits a {IERC20-Transfer} event for ERC20 compatibility.
	 */
	function burn(uint256 _amount, bytes memory _data) public virtual override {
		_burn(msg.sender, _amount, _data, '');
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> OPERATOR FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	/**
	 * @dev Returns true if an account is an operator of `tokenHolder`.
	 * Operators can send and burn tokens on behalf of their owners. All
	 * accounts are their own operator.
	 *
	 * @param _operator The address of the operator
	 * @param _tokenHolder The address of the token holder
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
			(_defaultOperators[_operator] && !_revokedOperators[_tokenHolder][_operator]) ||
			_operators[_tokenHolder][_operator];
	}

	/**
	 * @dev Make an account an operator of the caller.
	 *
	 * @param _operator The address of the operator
	 * See {isOperatorFor}.
	 *
	 * Emits an {AuthorizedOperator} event.
	 *
	 * Requirements
	 *
	 * - `operator` cannot be calling address.
	 */
	function authorizeOperator(address _operator) public virtual override {
		require(msg.sender != _operator, 'ERC777: authorizing self as operator');

		if (_defaultOperators[_operator]) {
			delete _revokedOperators[msg.sender][_operator];
		} else {
			_operators[msg.sender][_operator] = true;
		}

		emit AuthorizedOperator(_operator, msg.sender);
	}

	/**
	 * @dev Revoke an account's operator status for the caller.
	 *
	 * @param _operator The address of the operator
	 * See {isOperatorFor} and {defaultOperators}.
	 *
	 * Emits a {RevokedOperator} event.
	 *
	 * Requirements
	 *
	 * - `operator` cannot be calling address.
	 */
	function revokeOperator(address _operator) public virtual override {
		require(_operator != msg.sender, 'ERC777: revoking self as operator');

		if (_defaultOperators[_operator]) {
			_revokedOperators[msg.sender][_operator] = true;
		} else {
			delete _operators[msg.sender][_operator];
		}

		emit RevokedOperator(_operator, msg.sender);
	}

	/**
	 * @dev Send `_amount` of tokens to `_to` from `_from` on behalf of `_operator`.
	 *
	 * @param _from The address of the sender
	 * @param _to The address of the recipient
	 * @param _amount The number of tokens to be sent
	 * @param _data The data generated by the user to be passed to the recipient
	 * @param _operatorData The data generated by the operator to be passed to the recipient
	 *
	 * Emits {Sent} and {IERC20-Transfer} events.
	 */
	function operatorSend(
		address _from,
		address _to,
		uint256 _amount,
		bytes calldata _data,
		bytes calldata _operatorData
	) external override {
		require(isOperatorFor(msg.sender, _from), 'Not an operator');
		_send(_from, _to, _amount, _data, _operatorData, true);
	}

	/**
	 * @dev Destroys `amount` tokens from `account`, reducing the total supply.
	 *
	 * @param _account The address of the account to destroy tokens from
	 * @param _amount The number of tokens to be sent
	 * @param _data The data generated by the user to be passed to the recipient
	 * @param _operatorData The data generated by the operator to be passed to the recipient
	 *
	 * Emits {Sent} and {IERC20-Transfer} events.
	 */
	function operatorBurn(
		address _account,
		uint256 _amount,
		bytes calldata _data,
		bytes calldata _operatorData
	) public virtual override {
		require(
			isOperatorFor(msg.sender, _account),
			'ERC777: caller is not an operator for holder'
		);
		_burn(_account, _amount, _data, _operatorData);
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ERC20 FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	/**
	 * @dev Checks the amount of tokens that an owner allowed to a spender.
	 *
	 * @param _owner address The address which owns the funds.
	 * @param _spender address The address which will spend the funds.
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
	 * @dev Approves the passed address to spend the specified amount of tokens
	 *      on behalf of msg.sender.
	 *
	 * @param _spender The address which will spend the funds.
	 * @param _amount The amount of tokens to be spent.
	 */
	function approve(address _spender, uint256 _amount) public override returns (bool) {
		_approve(msg.sender, _spender, _amount);
		return true;
	}

	/**
	 * @dev Transfers token for a specified address
	 *
	 * @param _to The address to transfer to.
	 * @param _amount The amount to be transferred.
	 *
	 * Unlike `send`, `recipient` is _not_ required to implement the {IERC777Recipient}
	 * interface if it is a contract.
	 *
	 * Also emits a {Sent} event.
	 */
	function transfer(address _to, uint256 _amount) public virtual override returns (bool) {
		_send(msg.sender, _to, _amount, '', '', false);
		return true;
	}

	/**
	 * @dev Transfers tokens from one address to another
	 *
	 * @param _from address The address which you want to send tokens from
	 * @param _to address The address which you want to transfer to
	 * @param _amount uint256 the amount of tokens to be transferred
	 */
	function transferFrom(
		address _from,
		address _to,
		uint256 _amount
	) public override returns (bool) {
		address spender = msg.sender;
		_spendAllowance(_from, spender, _amount);
		_send(_from, _to, _amount, '', '', false);
		return true;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HELPER FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

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
		address account,
		uint256 amount,
		bytes memory userData,
		bytes memory operatorData,
		bool requireReceptionAck
	) internal virtual {
		require(account != address(0), 'ERC777: mint to the zero address');

		address operator = msg.sender;

		// Update state variables
		total += amount;
		balances[account] += amount;

		_callTokensReceived(
			operator,
			address(0),
			account,
			amount,
			userData,
			operatorData,
			requireReceptionAck
		);

		emit Minted(operator, account, amount, userData, operatorData);
		emit Transfer(address(0), account, amount);
	}

	/**
	 * @dev Helper function that performs the actual token sending.
	 * @param _from The address of the sender
	 * @param _to The address of the recipient
	 * @param _amount The number of tokens to be sent
	 * @param _data The data generated by the user to be passed to the recipient
	 * @param _operatorData The data generated by the operator to be passed to the recipient
	 * @param _prevenLock if true, contract recipients are required to implement ERC777TokensRecipient
	 */
	function _send(
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _data,
		bytes memory _operatorData,
		bool _prevenLock
	) internal {
		require(_from != address(0), 'ERC777: transfer from the zero address');
		require(_to != address(0), 'ERC777: transfer to the zero address');

		address operator = msg.sender;

		_callSender(operator, _from, _to, _amount, _data, _operatorData);

		_move(operator, _from, _to, _amount, _data, _operatorData);

		_callTokensReceived(operator, _from, _to, _amount, _data, _operatorData, _prevenLock);
	}

	/**
	 * @dev Helper function that performs the actual burning of tokens.
	 * @param _from The address of the one holding the tokens
	 * @param _amount The number of tokens to be burned
	 * @param _data The data generated by the user to be passed to the recipient
	 * @param _operatorData The data generated by the operator to be passed to the recipient
	 */
	function _burn(
		address _from,
		uint256 _amount,
		bytes memory _data,
		bytes memory _operatorData
	) internal {
		require(_from != address(0), 'ERC777: burn from the zero address');
		require(balanceOf(_from) >= _amount, 'Not enough funds');

		address operator = msg.sender;

		_callTokensToSend(operator, _from, address(0), _amount, _data, _operatorData);

		unchecked {
			balances[_from] = balances[_from] - _amount;
		}
		total -= _amount;

		emit Burned(operator, _from, _amount, _data, _operatorData);
		emit Transfer(_from, address(0), _amount);
	}

	function _callSender(
		address operator,
		address from,
		address to,
		uint256 amount,
		bytes memory userData,
		bytes memory operatorData
	) private {
		address implementer = _ERC1820_REGISTRY.getInterfaceImplementer(
			from,
			_TOKENS_SENDER_INTERFACE_HASH
		);
		if (implementer != address(0)) {
			IERC777Sender(implementer).tokensToSend(
				operator,
				from,
				to,
				amount,
				userData,
				operatorData
			);
		}
	}

	function _move(
		address _operator,
		address _from,
		address _to,
		uint256 _amount,
		bytes memory _userData,
		bytes memory _operatorData
	) private {
		uint256 fromBalance = balances[_from];
		require(fromBalance >= _amount, 'ERC777: transfer amount exceeds balance');
		unchecked {
			balances[_from] = fromBalance - _amount;
		}
		balances[_to] += _amount;

		emit Sent(_operator, _from, _to, _amount, _userData, _operatorData);
		emit Transfer(_from, _to, _amount);
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
	 * @param operator address operator requesting the transfer
	 * @param from address token holder address
	 * @param to address recipient address
	 * @param amount uint256 amount of tokens to transfer
	 * @param userData bytes extra information provided by the token holder (if any)
	 * @param operatorData bytes extra information provided by the operator (if any)
	 * @param requireReceptionAck if true, contract recipients are required to implement ERC777TokensRecipient
	 */
	function _callTokensReceived(
		address operator,
		address from,
		address to,
		uint256 amount,
		bytes memory userData,
		bytes memory operatorData,
		bool requireReceptionAck
	) private {
		address implementer = _ERC1820_REGISTRY.getInterfaceImplementer(
			to,
			_TOKENS_RECIPIENT_INTERFACE_HASH
		);
		if (implementer != address(0)) {
			IERC777Recipient(implementer).tokensReceived(
				operator,
				from,
				to,
				amount,
				userData,
				operatorData
			);
		} else if (requireReceptionAck) {
			require(
				!to.isContract(),
				'ERC777: token recipient contract has no implementer for ERC777TokensRecipient'
			);
		}
	}

	/**
	 * @dev See {ERC20-_approve}.
	 *
	 * Note that accounts cannot have allowance issued by their operators.
	 */
	function _approve(
		address holder,
		address spender,
		uint256 value
	) internal virtual {
		require(holder != address(0), 'ERC777: approve from the zero address');
		require(spender != address(0), 'ERC777: approve to the zero address');

		_allowances[holder][spender] = value;
		emit Approval(holder, spender, value);
	}

	/**
	 * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
	 *
	 * Does not update the allowance amount in case of infinite allowance.
	 * Revert if not enough allowance is available.
	 *
	 * Might emit an {Approval} event.
	 */
	function _spendAllowance(
		address owner,
		address spender,
		uint256 amount
	) internal virtual {
		uint256 currentAllowance = allowance(owner, spender);
		if (currentAllowance != type(uint256).max) {
			require(currentAllowance >= amount, 'ERC777: insufficient allowance');
			unchecked {
				_approve(owner, spender, currentAllowance - amount);
			}
		}
	}
}
