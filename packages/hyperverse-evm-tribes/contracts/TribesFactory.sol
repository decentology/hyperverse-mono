// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './utils/Counters.sol';
import './Tribes.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract TribesFactory is CloneFactory {
	using Counters for Counters.Counter;

	struct Tenant {
		Tribes tribes;
		address owner;
	}

	Counters.Counter public tenantCounter;

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;


	address public immutable owner;
	address public immutable masterContract;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	event TenantCreated(address _tenant, address _proxy);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	error Unauthorized();
	error InstanceAlreadyInitialized();
	error InstanceDoesNotExist();
	error ZeroAddress();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	modifier isAuthorized(address _tenant) {
		if(_tenant == address(0)) {
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
	
	constructor(address _masterContract, address _owner) {
		masterContract = _masterContract;
		owner = _owner;
	}

	/******************* TENANT FUNCTIONALITIES *******************/

	function createInstance(address _tenant) external isAuthorized(_tenant) hasAnInstance(_tenant) {
		Tribes tribe = Tribes(createClone(masterContract));

		//initializing tenant state of clone
		tribe.initialize(msg.sender);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.tribes = tribe;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
		tenantCounter.increment();

		emit TenantCreated(_tenant, address(tribe));
	}

	function getProxy(address _tenant) public view returns (Tribes) {
			if (!instance[_tenant]) {
			revert InstanceDoesNotExist();
		}
		return tenants[_tenant].tribes;
	}
}
