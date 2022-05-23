//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './hyperverse/IHyperverseModule.sol';
import './erc777/ERC777.sol';
import './erc777/interfaces/IERC777Recipient.sol';
import './interfaces/IERC1820Registry.sol';
import './utils/SafeMath.sol';
import './hyperverse/Initializable.sol';

contract StakeRewardsToken is IHyperverseModule, IERC777Recipient, Initializable {
	using SafeMath for uint256;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	ERC777 public rewardsToken;
	ERC777 public stakingToken;

	uint256 public rewardRate;
	uint256 public lastUpdatedTime;
	uint256 public rewardPerTokenStored;

	mapping(address => uint256) public userRewardPerTokenPaid;
	mapping(address => uint256) public rewards;

	uint256 public totalSupply;
	mapping(address => uint256) private _balances;

	address immutable contractOwner;
	address private _tenantOwner;

	IERC1820Registry internal constant _ERC1820_REGISTRY =
		IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	event TokensRecieved(
		address indexed _operator,
		address indexed _from,
		address indexed _to,
		uint256 _amount,
		bytes _userData,
		bytes _operatorData
	);

	event TokenStaked(address indexed _user, uint256 _amount);
	event RewardTokenPaid(address indexed _user, uint256 _amount);
	event StakeWithdrawn(address indexed _user, uint256 _amount);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unauthorized();
	error AlreadyInitialized();
	error ZeroAddress();
	error InsufficientBalance();
	error ZeroAmount();

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

	modifier updateReward(address _account) {
		rewardPerTokenStored = rewardPerToken();
		lastUpdatedTime = block.timestamp;

		rewards[_account] = earned(_account);
		userRewardPerTokenPaid[_account] = rewardPerTokenStored;
		_;
	}

	modifier hasStakeBalance(address _account, uint256 _amount) {
		if (_balances[_account] < _amount || _balances[_account] <= 0) {
			revert InsufficientBalance();
		}
		_;
	}

	modifier hasRewardBalance(address _account) {
		if (rewards[_account] <= 0) {
			revert InsufficientBalance();
		}
		_;
	}

	modifier checkAmount(uint256 _amount) {
		if (_amount <= 0) {
			revert ZeroAmount();
		}
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Stake Rewards Token',
			Author(_owner, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
		contractOwner = _owner;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	function initialize(
		address _tenant,
		address _stakingToken,
		address _rewardsToken,
		uint256 _rewardRate
	) external initializer canInitialize(_tenant) {
		stakingToken = ERC777(_stakingToken);
		rewardsToken = ERC777(_rewardsToken);
		rewardRate = _rewardRate;

		_ERC1820_REGISTRY.setInterfaceImplementer(
			address(this),
			keccak256('ERC777TokensRecipient'),
			address(this)
		);

		_tenantOwner = _tenant;
	}

	function balance() external view returns (uint256) {
		return balanceOf(msg.sender);
	}

	function balanceOf(address _account) public view returns (uint256) {
		return _balances[_account];
	}

	function rewardPerToken() public view returns (uint256) {
		if (totalSupply == 0) {
			return 0;
		}

		return
			rewardPerTokenStored +
			(((block.timestamp - lastUpdatedTime) * rewardRate * 1e18) / totalSupply);
	}

	function earned(address _account) public view returns (uint256) {
		return
			((_balances[_account] * (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) +
			rewards[_account];
	}

	function stake(uint256 _amount) external checkAmount(_amount) updateReward(msg.sender) {
		totalSupply = totalSupply.add(_amount);
		_balances[msg.sender] = _balances[msg.sender].add(_amount);
		stakingToken.operatorSend(msg.sender, address(this), _amount, '', '');
		emit TokenStaked(msg.sender, _amount);
	}

	function withdraw(uint256 _amount)
		external
		checkAmount(_amount)
		hasStakeBalance(msg.sender, _amount)
		updateReward(msg.sender)
	{
		totalSupply = totalSupply.sub(_amount);
		_balances[msg.sender] = _balances[msg.sender].sub(_amount);
		stakingToken.send(msg.sender, _amount, '');
		emit StakeWithdrawn(msg.sender, _amount);
	}

	function claimReward() external updateReward(msg.sender) hasRewardBalance(msg.sender) {
		uint256 reward = rewards[msg.sender];
		if (reward > 0) {
			rewards[msg.sender] = 0;
			rewardsToken.operatorSend(_tenantOwner, msg.sender, reward, '', '');
			emit RewardTokenPaid(msg.sender,reward);
		}
	}

	function tokensReceived(
		address _operator,
		address _from,
		address _to,
		uint256 _amount,
		bytes calldata _userData,
		bytes calldata _operatorData
	) external override {
		emit TokensRecieved(_operator, _from, _to, _amount, _userData, _operatorData);
	}
}
