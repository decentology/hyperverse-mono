// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './StakeRewardsToken.sol';
import './interfaces/IERC1820Registry.sol';
import './utils/Counters.sol';

import 'hardhat/console.sol';

/**
 * @dev Clone Factory Implementation for Stake Rewards Module
 */

contract StakeRewardsFactory is CloneFactory {
	using Counters for Counters.Counter;
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	struct Tenant {
		StakeRewardsToken stakeRewards;
		address owner;
	}

	Counters.Counter public tenantCounter;

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;

	address public immutable owner;
	address public immutable masterContract;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;

	IERC1820Registry internal constant _ERC1820_REGISTRY =
		IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	event TenantCreated(address _tenant, address _proxy);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	error Unauthorized();
	error InstanceAlreadyInitialized();
	error InstanceDoesNotExist();
	error ZeroAddress();
	error InvalidTokenAddress();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	modifier isAuthorized(address _tenant) {
		if (_tenant == address(0)) {
			revert ZeroAddress();
		}
		if (!(msg.sender == _tenant || msg.sender == hyperverseAdmin)) {
			revert Unauthorized();
		}
		_;
	}

	modifier hasAnInstance(address _tenant) {
		if (instance[_tenant]) {
			revert InstanceAlreadyInitialized();
		}
		_;
	}

	modifier erc777interfaceCheck(address _stakingToken, address _rewardsToken) {
		if (
			_ERC1820_REGISTRY.getInterfaceImplementer(_stakingToken, keccak256('ERC777Token')) ==
			address(0) ||
			_ERC1820_REGISTRY.getInterfaceImplementer(_rewardsToken, keccak256('ERC777Token')) ==
			address(0)
		) {
			revert InvalidTokenAddress();
		}
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	constructor(address _masterContract, address _owner) {
		masterContract = _masterContract;
		owner = _owner;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	function createInstance(
		address _tenant,
		address _stakingToken,
		address _rewardsToken,
		uint256 _rewardRate
	)
		external
		isAuthorized(_tenant)
		hasAnInstance(_tenant)
		erc777interfaceCheck(_stakingToken, _rewardsToken)
	{
		console.log('creating instance', _tenant);
		StakeRewardsToken stakeInstance = StakeRewardsToken(createClone(masterContract));

		//initializing tenant state of clone
		stakeInstance.initialize(_tenant, _stakingToken, _rewardsToken, _rewardRate);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.stakeRewards = stakeInstance;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
		tenantCounter.increment();

		emit TenantCreated(_tenant, address(stakeInstance));
	}

	function getProxy(address _tenant) public view returns (StakeRewardsToken) {
		console.log('getting proxy', _tenant);
		if (!instance[_tenant]) {
			revert InstanceDoesNotExist();
		}
		return tenants[_tenant].stakeRewards;
	}
}
