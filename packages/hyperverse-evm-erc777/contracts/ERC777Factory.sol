// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './ERC777.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract ERC777Factory is CloneFactory {
	using Counters for Counters.Counter;

	Counters.Counter public tenantCounter;

	struct Tenant {
		ERC777 token;
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
		require(instance[_tenant] == false, 'The tenant already has an instance');
		_;
	}

	constructor(address _masterContract, address _owner) {
		masterContract = _masterContract;
		owner = _owner;
	}

	/******************* TENANT FUNCTIONALITIES *******************/

	function createInstance(
		string memory _name,
		string memory _symbol,
		address[] memory _defaultOperatorsArr,
		uint256 _initialSupply,
		address _tenant
	) external hasAnInstance(_tenant) isAllowedToCreateInstance(_tenant) {
		ERC777 token = ERC777(createClone(masterContract));

		//initializing tenant state of clone
		token.init(_name, _symbol, _defaultOperatorsArr, _initialSupply, _tenant);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.token = token;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
		tenantCounter.increment();
	}

	function getProxy(address _tenant) public view returns (ERC777) {
		return tenants[_tenant].token;
	}
}
