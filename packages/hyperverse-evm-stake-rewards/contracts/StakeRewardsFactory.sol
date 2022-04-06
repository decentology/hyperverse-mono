// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './StakeRewardsToken.sol';
import './interfaces/IERC1820Registry.sol';

/**
 * @dev Clone Factory Implementation for Stake Rewards Module
 */

contract StakeRewardsFactory is CloneFactory {
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	struct Tenant {
		StakeRewardsToken stakeRewards;
		address owner;
	}

	mapping(address => Tenant) public tenants;
	mapping(address => bool) private instance;

	address public immutable masterContract;
	address public immutable owner;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;

	IERC1820Registry internal constant _ERC1820_REGISTRY =
		IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	modifier isOwner(address _tenant) {
		require(
			tenants[_tenant].owner == msg.sender,
			'The calling address is not an owner of a tenant'
		);
		_;
	}

	modifier isAllowedToCreateInstance(address _tenant) {
		require(
			msg.sender == _tenant || msg.sender == hyperverseAdmin ,
			'Please use a valid address to create an instance'
		);
		_;
	}

	modifier hasAnInstance(address _tenant) {
		require(
			instance[_tenant] == false,
			'The tenant already has an instance'
		);
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

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
	) external hasAnInstance(_tenant) isAllowedToCreateInstance(_tenant) {
		require( _ERC1820_REGISTRY.getInterfaceImplementer(_stakingToken,keccak256('ERC777Token')) != address(0), 'The staking token is not an ERC777Token' );
			require( _ERC1820_REGISTRY.getInterfaceImplementer(_rewardsToken,keccak256('ERC777Token')) != address(0), 'The reward token is not an ERC777Token' );
		StakeRewardsToken stakeInstance = StakeRewardsToken(createClone(masterContract));

		//initializing tenant state of clone
		stakeInstance.init(_tenant, _stakingToken, _rewardsToken, _rewardRate);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.stakeRewards = stakeInstance;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
	}

	function getProxy(address _owner) public view returns (StakeRewardsToken) {
		return tenants[_owner].stakeRewards;
	}

}
