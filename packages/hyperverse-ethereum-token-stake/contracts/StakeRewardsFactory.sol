// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './StakeRewardsToken.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract StakeRewardsTokenFactory is CloneFactory {
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	struct Tenant {
		StakeRewardsToken stakeRewards;
		address owner;
	}

	mapping(address => Tenant) public tenants;

	address public immutable masterContract;
	address private hyperverseAdmin = 0xD847C7408c48b6b6720CCa75eB30a93acbF5163D;

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
			msg.sender == _tenant || msg.sender == hyperverseAdmin,
			'Please use a valid address to create an instance'
		);
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	constructor(address _masterContract) {
		masterContract = _masterContract;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	function createInstance(
		address _tenant,
		address _stakingToken,
		address _rewardsToken
	) external isAllowedToCreateInstance(_tenant) {
		StakeRewardsToken stakeInstance = StakeRewardsToken(createClone(masterContract));

		//initializing tenant state of clone
		stakeInstance.init(_tenant, _stakingToken, _rewardsToken);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.stakeRewards = stakeInstance;
		newTenant.owner = _tenant;
	}

	function getProxy(address _owner) public view returns (StakeRewardsToken) {
		return tenants[_owner].stakeRewards;
	}

	/******************* ERC20 FUNCTIONALITIES *******************/
	function totalSupply(address _tenant) external view returns (uint256) {
		return getProxy(_tenant).totalSupply();
	}
}
