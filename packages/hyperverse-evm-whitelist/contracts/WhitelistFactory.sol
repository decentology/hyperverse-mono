// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import './utils/Counters.sol';
import './Whitelist.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract WhitelistFactory is CloneFactory {
	using Counters for Counters.Counter;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	Counters.Counter public tenantCounter;

	enum WHITELIST_OPTIONS {
		MERKLE,
		REGULAR
	}

	enum WHITELIST_TYPE {
		TIME,
		QUANTITY,
		NFT,
		TOKEN
	}

	struct Tenant {
		Whitelist proxy;
		address owner;
	}

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;

	address public immutable owner;
	address public immutable masterContract;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unathorized();
	error InstanceAlreadyInitialized();
	error InvalidTime();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	modifier isAuthorized(address _tenant) {
		if (msg.sender != _tenant || msg.sender != hyperverseAdmin) {
			revert Unathorized();
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

	function createInstance(
		address _tenant,
		uint256 _startTime,
		uint256 _endTime,
		uint256 _units
	) external isAuthorized(_tenant) hasAnInstance(_tenant) {
		if(_startTime > _endTime || block.timestamp < _startTime || block.timestamp > _endTime) {
			revert InvalidTime();
		}


		Whitelist proxy = Whitelist(createClone(masterContract));

		//initializing tenant state of clone
		proxy.initDefault(_tenant, _startTime, _endTime, _units);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.proxy = proxy;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
		tenantCounter.increment();
	}

	function createMerkleInsance(address _tenant)
		external
		isAuthorized(_tenant)
		hasAnInstance(_tenant)
	{}

	function getProxy(address _tenant) public view returns (Whitelist) {
		return tenants[_tenant].proxy;
	}
}
