// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import './ERC721.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract ERC721Factory is CloneFactory {
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	struct Tenant {
		ERC721 nft;
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

	function createInstance(string memory _name, string memory _symbol) external {
		address tenant = msg.sender;
		ERC721 nft = ERC721(createClone(masterContract));

		//initializing tenant state of clone
		nft.init(_name, _symbol, tenant);

		//set Tenant data
		Tenant storage newTenant = tenants[tenant];
		newTenant.nft = nft;
		newTenant.owner = tenant;
	}

	function getProxy(address _tenant) public view returns (ERC721) {
		return tenants[_tenant].nft;
	}
}
