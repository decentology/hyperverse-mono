// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import './ERC777.sol';
import "hardhat/console.sol";

/**
 * @dev Clone Factory Implementation for ERC777 Token
 */

contract ERC777Factory is CloneFactory {
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	struct Tenant {
		ERC777 erc777;
		address owner;
	}

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;

	address public immutable masterContract;
	address public immutable owner;
	address private hyperverseAdmin = 0x62a7aa79a52591Ccc62B71729329A80a666fA50f;

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

	modifier hasAnInstance(address _tenant) {
		require(instance[_tenant] == false, 'The tenant already has an instance');
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
		string memory _name,
		string memory _symbol,
		address[] memory _defaultOperators,
		uint256 _initialSupply,
		address _tenant
	) external hasAnInstance(_tenant) isAllowedToCreateInstance(_tenant) {
		ERC777 token = ERC777(createClone(masterContract));
		//initializing tenant state of clone
		token.init(_name, _symbol, _defaultOperators, _initialSupply, msg.sender);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.erc777 = token;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
	}

	function getProxy(address _tenant) public view returns (ERC777) {
		return tenants[_tenant].erc777;
	}
}
