// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import './FluidNFT.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract FluidNFTFactory is CloneFactory {
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	struct Tenant {
		FluidNFT nft;
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
		string memory name,
		string memory symbol,
		ISuperfluid host,
		IConstantFlowAgreementV1 cfa,
		ISuperToken acceptedToken
	) external {
		address tenant = msg.sender;
		FluidNFT nft = FluidNFT(createClone(masterContract));

		//initializing tenant state of clone
		nft.init(name, symbol, tenant, host, cfa, acceptedToken);

		//set Tenant data
		Tenant storage newTenant = tenants[tenant];
		newTenant.nft = nft;
		newTenant.owner = tenant;
	}

	function getProxy(address _tenant) public view returns (FluidNFT) {
		return tenants[_tenant].nft;
	}
}
