// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Tribes.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract TribesFactory is CloneFactory {
	using Counters for Counters.Counter;

	Counters.Counter public tenantCounter;
	
	struct Tenant {
		Tribes tribes;
		address owner;
	}

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;


	address public immutable owner;
	address public immutable masterContract;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;

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

	modifier hasAnInstance(address _tenant) {
		require(
			instance[_tenant] == false,
			'The tenant already has an instance'
		);
		_;
	}

	constructor(address _masterContract, address _owner) {
		masterContract = _masterContract;
		owner = _owner;
	}

	/******************* TENANT FUNCTIONALITIES *******************/

	function createInstance(address _tenant) external   hasAnInstance(_tenant) isAllowedToCreateInstance(_tenant) {
		Tribes tribe = Tribes(createClone(masterContract));

		//initializing tenant state of clone
		tribe.init(msg.sender);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.tribes = tribe;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
		tenantCounter.increment();
	}

	function getProxy(address _tenant) public view returns (Tribes) {
		return tenants[_tenant].tribes;
	}
}
