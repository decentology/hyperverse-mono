// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';

contract Whitelist is IHyperverseModule {
	enum WHITELIS_OPTIONS {
		TIME,
		QUANTITY,
		NFT,
		TOKEN
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	address public immutable contractOwner;
	address private tenantOwner;
	bool public active;

	///+state

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events
	event ActivatedWhitelist();
	event DeactivatedWhitelist();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unathorized();
	error WhitelistAlreadyActive();
	error WhitelistIsNotActive();


	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
	modifier isTenantOwner() {
		if (msg.sender != tenantOwner) {
			revert Unathorized();
		}
		_;
	}

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Whitelist Module',
			Author(_owner, 'https://externallink.net'),
			'1.0.0',
			3479831479814,
			'https://externallink.net'
		);
		contractOwner = _owner;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TENANT FUNCTIONALITIES  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	function init(address _tenant) external {
		require(tenantOwner == address(0), 'Contract is already initialized');
		/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
		tenantOwner = _tenant;
	}

	function activateWhitelist() external isTenantOwner{
		if(active) {
			revert WhitelistAlreadyActive();
		}
		active = true;
	}

	function deactiveWhitelist() external isTenantOwner{
		if(!active) {
			revert WhitelistIsNotActive();
		}
		active = false;
	}
}
