// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';
import './utils/Counters.sol';
import 'hardhat/console.sol';

contract Whitelist is IHyperverseModule {
	using Counters for Counters.Counter;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	address public immutable contractOwner;
	address private tenantOwner;
	mapping(address => bool) public whitelistedAddresses;
	mapping(address => bool) public addressesClaimed;

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TIME AND QUANTITY BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	uint256 public startTime;
	uint256 public endTime;
	uint256 public units;
	bool public timeBased;
	bool public quantityBased;
	Counters.Counter public claimedCounter;

	bool public active;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events
	event ActivatedWhitelist();
	event DeactivatedWhitelist();
	event NewAddressWhitelisted(address _user);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unathorized();
	error WhitelistAlreadyActive();
	error WhitelistIsNotActive();
	error ZeroAddress();
	error AlreadyInitialized();
	error AlreadyClaimedWhitelist();
	error AlreadyInWhitelist();

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TIME AND QUANTITY BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	error WhitelistingAlreadyEnded();
	error WhitelistingNotStarted();
	error NoAvailableUnitsLeft();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
	modifier isTenantOwner() {
		if (msg.sender != tenantOwner) {
			revert Unathorized();
		}
		_;
	}

	modifier canInitialize(address _tenant) {
		if (_tenant == address(0)) {
			revert ZeroAddress();
		}
		if (tenantOwner != address(0)) {
			revert AlreadyInitialized();
		}
		_;
	}

	modifier isWhitelisted(address _user) {
		if (whitelistedAddresses[_user]) {
			revert AlreadyInWhitelist();
		}
		_;
	}

	modifier claimedWhitelist(address _userAddr) {
		if (addressesClaimed[_userAddr]) {
			revert AlreadyClaimedWhitelist();
		}
		_;
	}

	modifier WhitelistStarted() {
		if (timeBased && block.timestamp < startTime) {
			revert WhitelistingNotStarted();
		}
		_;
	}

	modifier WhitelistEnded() {
		if (timeBased && block.timestamp > endTime) {
			revert WhitelistingAlreadyEnded();
		}
		_;
	}

	modifier WhitelistActive() {
		if(!active) {
			revert WhitelistIsNotActive();
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

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TIME AND QUANTITY BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	//tenant funcitonality
	function initDefault(
		address _tenant,
		uint256 _startTime,
		uint256 _endTime,
		uint256 _units
	) external canInitialize(_tenant) {
		if (_units != 0) {
			units = _units;
			quantityBased = true;
		}

		if (_startTime != 0) {
			startTime = _startTime;
			endTime = _endTime;
			timeBased = true;
		}

		tenantOwner = _tenant;
	}

	//user functionalities
	function getWhitelisted() public isWhitelisted(msg.sender) WhitelistStarted WhitelistEnded {
		if (quantityBased) {
			if (claimedCounter.current() == units) {
				revert NoAvailableUnitsLeft();
			}
			claimedCounter.increment();
		}

		whitelistedAddresses[msg.sender] = true;
		emit NewAddressWhitelisted(msg.sender);
	}

	function claimWhitelist() public claimedWhitelist(msg.sender) WhitelistActive {
		if (addressesClaimed[msg.sender]) {
			revert AlreadyClaimedWhitelist();
		}

		addressesClaimed[msg.sender] = true;
	}

	function activateWhitelistClaiming() external isTenantOwner {
		if (active) {
			revert WhitelistAlreadyActive();
		}
		active = true;
	}

	function deactivateWhitelistClaiming() external isTenantOwner {
		if (!active) {
			revert WhitelistIsNotActive();
		}
		active = false;
	}
}
