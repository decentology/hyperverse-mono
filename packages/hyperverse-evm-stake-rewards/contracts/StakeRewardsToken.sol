//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//TO DO: switch this to our ERC777
import '@openzeppelin/contracts/token/ERC777/ERC777.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './hyperverse/IHyperverseModule.sol';

contract StakeRewardsToken is IHyperverseModule {
	using SafeMath for uint256;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	ERC777 public rewardsToken;
	ERC777 public stakingToken;

	uint256 public rewardRate;
	uint256 public lastUpdatedTime;
	uint256 public rewardPerTokenStored;

	mapping(address => uint256) public userRewardPerTokenPaid;
	mapping(address => uint256) public rewards;

	uint256 public _totalSupply = 0;
	mapping(address => uint256) private _balances;

	address immutable owner;
	address private tenantOwner;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	modifier updateReward(address _account) {
		rewardPerTokenStored = rewardPerToken();
		lastUpdatedTime = block.timestamp;

		rewards[_account] = earned(_account);
		userRewardPerTokenPaid[_account] = rewardPerTokenStored;
		_;
	}

	modifier hasStakeBalance(address _account, uint256 _amount) {
		require(_balances[_account] >= _amount || _balances[_account] > 0, "Insufficient balance");
		_;
	}

	modifier hasRewardBalance(address _account) {
		require(rewards[_account] > 0, "Insufficient balance");
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Stake Rewards Token',
			Author(_owner, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
		owner = _owner;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	function init(
		address _tenant,
		address _stakingToken,
		address _rewardsToken,
		uint256 _rewardRate
	) external {
		require(tenantOwner == address(0), "Contract is already initialized");
		tenantOwner = _tenant;

		// TO DO: we need to check that the contract they sent in is registered in the ERC1820 registry
		// NEEDS TO BE CHECKED: 
		// since in the ERC777 module, we are also registering the ERC20 instance in the ERC1820 registry
		// https://github.com/decentology/hyperverse-mono/blob/7f386f95de2b472ccf00a3cf799a124b8fd0c47e/packages/hyperverse-evm-erc777/contracts/ERC777.sol#L100
		// does our staking and rewards token need to be an erc777 or can we keep it as erc20? 
		stakingToken = ERC777(_stakingToken);
		rewardsToken = ERC777(_rewardsToken);
		rewardRate = _rewardRate;
	}

	function totalSupply() external view returns (uint256) {
		return _totalSupply;
	}

	function balance() external view returns (uint256) {
		return balanceOf(msg.sender);
	}

	function balanceOf(address _account) public view returns (uint256) {
		return _balances[_account];
	}

	function rewardPerToken() public view returns (uint256) {
		if (_totalSupply == 0) {
			return 0;
		}

		return
			rewardPerTokenStored +
			(((block.timestamp - lastUpdatedTime) * rewardRate * 1e18) / _totalSupply);
	}

	function earned(address _account) public view returns (uint256) {
		return
			((_balances[_account] * (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) +
			rewards[_account];
	}

	function stake(uint256 _amount) external updateReward(msg.sender) {
		_totalSupply = _totalSupply.add(_amount);
		_balances[msg.sender] = _balances[msg.sender].add(_amount);
		stakingToken.transferFrom(msg.sender, address(this), _amount);
	}

	function withdraw(uint256 _amount) external hasStakeBalance(msg.sender, _amount) updateReward(msg.sender) {
		_totalSupply = _totalSupply.sub(_amount);
		_balances[msg.sender] = _balances[msg.sender].sub(_amount);
		stakingToken.transfer(msg.sender, _amount);
	}

	function getReward() external hasRewardBalance(msg.sender)  updateReward(msg.sender) {
		uint256 reward = rewards[msg.sender];
		rewards[msg.sender] = 0;
		rewardsToken.transfer(msg.sender, reward);
	}
}
