// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import './utils/Counters.sol';
import './utils/Address.sol';
import './Whitelist.sol';
import './interfaces/IERC721.sol';

import 'hardhat/console.sol';


/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract WhitelistFactory is CloneFactory {
	using Counters for Counters.Counter;
	using Address for address;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	Counters.Counter public tenantCounter;

	struct Tenant {
		Whitelist proxy;
		address owner;
	}

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;
	mapping(address => bool) public merkleInstance;

	address public immutable owner;
	address public immutable masterContract;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events
	event TenantCreated(address _tenant, address _proxy);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unathorized();
	error InstanceAlreadyInitialized();
	error InstanceDoesNotExist();
	error ZeroAddress();
	error InvalidTime();
	error InvalidValuesToCreateInstance();
	error InvalidMerkelRoot();
	error NotAnERC71();
	error NotAnERC20();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	modifier isAuthorized(address _tenant) {
		if(_tenant == address(0)) {
			revert ZeroAddress();
		}
		if (!(msg.sender == _tenant || msg.sender == hyperverseAdmin)) {
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
		uint256 _units,
		address _ERC721,
		address _ERC20,
		bytes32 _merkleRoot
	) external isAuthorized(_tenant) hasAnInstance(_tenant) {
		if (
			_startTime == 0 &&
			_endTime == 0 &&
			_units == 0 &&
			_ERC721 == address(0) &&
			_ERC20 == address(0) &&
			_merkleRoot == bytes32(0)
		) {
			revert InvalidValuesToCreateInstance();
		}

		if (_startTime != 0 && _endTime != 0) {
			if (
				_startTime > _endTime || block.timestamp > _startTime || block.timestamp > _endTime
			) {
				revert InvalidTime();
			}
		}

		if (_ERC721 != address(0) && _ERC721.isContract()) {
			IERC721 ERC721 = IERC721(_ERC721);
			bool check = ERC721.supportsInterface(0x80ac58cd);
			if (!check) {
				revert NotAnERC71();
			}
		}

		if (!_ERC20.isContract() && _ERC20 != address(0)) {
			revert NotAnERC20();
		}

		Whitelist proxy = Whitelist(createClone(masterContract));

		//initializing tenant state of clone
		proxy.initialize(_tenant, _startTime, _endTime, _units, _ERC721, _ERC20, _merkleRoot);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.proxy = proxy;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
		tenantCounter.increment();

		emit TenantCreated(_tenant, address(proxy));
	}

	function getProxy(address _tenant) public view returns (Whitelist) {
		if (instance[_tenant]) {
			revert InstanceAlreadyInitialized();
		}
		return tenants[_tenant].proxy;
	}
}
