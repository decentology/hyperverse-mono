// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import './hyperverse/IHyperverseModule.sol';

contract Module is IHyperverseModule {
	address public immutable contractOwner;
	address private tenantOwner;

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Module',
			Author(_owner, 'https://externallink.net'),
			'1.0.0',
			3479831479814,
			'https://externallink.net'
		);
		contractOwner = _owner;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TENANT FUNCTIONALITIES  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	function init(address _tenant) external {
		/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
		tenantOwner = _tenant;
	}
}
