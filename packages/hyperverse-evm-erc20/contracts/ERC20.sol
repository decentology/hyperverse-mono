// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './interfaces/IERC20.sol';
import './utils/SafeMath.sol';
import './hyperverse/IHyperverseModule.sol';
import './hyperverse/Initializable.sol';

contract ERC20 is IERC20, IHyperverseModule, Initializable {
	using SafeMath for uint256;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	// Account used to deploy contract
	address public immutable contractOwner;

	//stores the tenant owner
	address private _tenantOwner;

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	string public name;
	string public symbol;
	uint256 public decimals;

	// Token balance for each address
	mapping(address => uint256) balances;

	// Approval granted to transfer tokens by one address to another address
	mapping(address => mapping(address => uint256)) internal allowed;

	// Tokens currently in circulation (you'll need to update this if you create more tokens)
	uint256 public override totalSupply;

	// Tokens created when contract was deployed
	uint256 public initialSupply;

	// Multiplier to convert to smallest unit
	uint256 public UNIT_MULTIPLIER;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unauthorized();
	error AlreadyInitialized();
	error ZeroAddress();
	error SameAddress();
	error InsufficientBalance();
	error InsufficientAllowance();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
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
			'ERC20',
			Author(_owner, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
		contractOwner = _owner;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	/**
	 * @dev Initializes the instance of a tenant for this contract and sets the state variables
	 *
	 * @param _name The name of the token
	 * @param _symbol The symbol of the token
	 * @param _decimal The number of decimals of the token
	 * @param _tenant The address of the instance owner
	 */
	function initialize(
		string memory _name,
		string memory _symbol,
		uint256 _decimal,
		address _tenant
	) external initializer canInitialize(_tenant) {
		/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
		name = _name;
		symbol = _symbol;
		decimals = _decimal;

		// Multiplier to convert to smallest unit
		UNIT_MULTIPLIER = 10**uint256(decimals);

		uint256 supply = 1000;

		// Convert supply to smallest unit
		totalSupply = supply.mul(UNIT_MULTIPLIER);
		initialSupply = totalSupply;

		// Assign entire initial supply to contract owner
		balances[_tenant] = totalSupply;

		_tenantOwner = _tenant;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	/**
	 * @dev Gets the balance of the calling address.
	 *
	 * @return An uint256 representing the amount owned by the calling address
	 */
	function balance() public view returns (uint256) {
		return balanceOf(msg.sender);
	}

	/**
	 * @dev Gets the balance of the specified address.
	 *
	 * @param _owner The address to query the balance of
	 * @return An uint256 representing the amount owned by the passed address
	 */
	function balanceOf(address _owner) public view override returns (uint256) {
		return balances[_owner];
	}

	/**
	 * @dev Transfers token for a specified address
	 *
	 * @param _to The address to transfer to.
	 * @param _value The amount to be transferred.
	 * @return A bool indicating if the transfer was successful.
	 */
	function transfer(address _to, uint256 _value)
		public
		override
		addressCheck(msg.sender, _to)
		returns (bool)
	{
		if (balanceOf(msg.sender) < _value) {
			revert InsufficientBalance();
		}
		balances[msg.sender] = balances[msg.sender].sub(_value);
		balances[_to] = balances[_to].add(_value);
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

	/**
	 * @dev Transfers tokens from one address to another
	 *
	 * @param _from address The address which you want to send tokens from
	 * @param _to address The address which you want to transfer to
	 * @param _value uint256 the amount of tokens to be transferred
	 * @return A bool indicating if the transfer was successful.
	 */
	function transferFrom(
		address _from,
		address _to,
		uint256 _value
	) public override addressCheck(_from, _to) returns (bool) {
		if (allowed[_from][msg.sender] < _value) {
			revert InsufficientAllowance();
		}

		balances[_from] = balances[_from].sub(_value);
		balances[_to] = balances[_to].add(_value);
		allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
		emit Transfer(_from, _to, _value);
		return true;
	}

	/**
	 * @dev Checks the amount of tokens that an owner allowed to a spender.
	 *
	 * @param _owner address The address which owns the funds.
	 * @param _spender address The address which will spend the funds.
	 * @return A uint256 specifying the amount of tokens still available for the spender.
	 */
	function allowance(address _owner, address _spender) public view override returns (uint256) {
		return allowed[_owner][_spender];
	}

	/**
	 * @dev Approves the passed address to spend the specified amount of tokens
	 *      on behalf of msg.sender.
	 *
	 * @param _spender The address which will spend the funds.
	 * @param _value The amount of tokens to be spent.
	 * @return A bool indicating success (always returns true)
	 */
	function approve(address _spender, uint256 _value) public override returns (bool) {
		allowed[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	/** @dev Creates `amount` tokens and assigns them to tenantOwner, increasing
	 * the total supply.
	 *
	 * Emits a {Transfer} event with `from` set to the zero address.
	 *
	 * @param _amount The address which will spend the funds.
	 */
	function mint(uint256 _amount) external isTenantOwner {
		balances[msg.sender] += _amount;
		totalSupply += _amount;
		emit Transfer(address(0), msg.sender, _amount);
	}

	/** @dev Destroys `amount` of tokens from the caller's account, decreasing
	 * the total supply.
	 *
	 * Emits a {Transfer} event with `from` set to the zero address.
	 *
	 * @param _amount The total tokens to be destroyed.
	 */
	function burn(uint256 _amount) external {
		if (balanceOf(msg.sender) < _amount) {
			revert InsufficientBalance();
		}

		balances[msg.sender] -= _amount;
		totalSupply -= _amount;
		emit Transfer(msg.sender, address(0), _amount);
	}
}
