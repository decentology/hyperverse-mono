// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';
import './hyperverse/Initializable.sol';
import './utils/Counters.sol';
import './utils/SafeMath.sol';

contract Tribes is IHyperverseModule, Initializable {
	using Counters for Counters.Counter;
	using SafeMath for uint256;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	address public immutable contractOwner;
	address private _tenantOwner;

	mapping(uint256 => TribeData) public allTribes;
	mapping(address => uint256) public participants;
	Counters.Counter public tribeCounter;

	struct TribeData {
		string metadata;
		mapping(address => bool) members;
		uint256 numOfMembers;
		uint256 tribeId;
	}
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events
	event JoinedTribe(uint256 indexed tribeId, address newMember);
	event LeftTribe(uint256 indexed tribeId, address member);
	event NewTribeCreated(string metadata);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unauthorized();
	error AlreadyInitialized();
	error ZeroAddress();
	error TribeDoesNotExist();
	error UserNotInATribe();
	error UserInATribe();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
	modifier isTenantOwner() {
		if (msg.sender != _tenantOwner) {
			revert Unauthorized();
		}
		_;
	}

	modifier canInitialize(address _tenant) {
		if (_tenantOwner != address(0)) {
			revert AlreadyInitialized();
		}
		_;
	}

	modifier isNotInATribe(address _user) {
		if(participants[_user] == 0) {
			revert UserNotInATribe();
		}

		_;
	}

  modifier tribeExists(uint256 _tribeId) {
		if(tribeCounter.current() < _tribeId) {
			revert TribeDoesNotExist();
		}
    _;
  }

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Tribe Module',
			_owner,
			'1.0.0',
			block.timestamp,
			'https://www.hyperverse.dev/'
		);
		contractOwner = _owner;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	function initialize(address _tenant) external initializer canInitialize(_tenant) {
		_tenantOwner = _tenant;
	}

	function addNewTribe(string memory _metadata) public isTenantOwner {
		tribeCounter.increment();
		uint256 newTribeId = tribeCounter.current();

		TribeData storage newTribe = allTribes[newTribeId];
		newTribe.metadata = _metadata;
		newTribe.tribeId = newTribeId;

		emit NewTribeCreated(_metadata);
	}

	function joinTribe(uint256 _tribeId) external tribeExists(_tribeId) {
		if(participants[msg.sender] != 0) {
			revert UserInATribe();
		}

		TribeData storage tribe = allTribes[_tribeId];
		tribe.members[msg.sender] = true;
		tribe.numOfMembers += 1;
		participants[msg.sender] = _tribeId;

		emit JoinedTribe(_tribeId, msg.sender);
	}

	function leaveTribe() external isNotInATribe(msg.sender) {
		uint256 tribeId = participants[msg.sender];
		TribeData storage tribe = allTribes[tribeId];
		tribe.members[msg.sender] = false;
		tribe.numOfMembers -= 1;
		participants[msg.sender] = 0;

		emit LeftTribe(tribeId, msg.sender);
	}

	function getUserTribe(address _user)
		public
		view
		isNotInATribe(_user)
		returns (uint256 tribeId)
	{
		return participants[_user];
	}

  function getTribeData(uint256 _tribeId) public view tribeExists(_tribeId) returns (string memory) {
    return allTribes[_tribeId].metadata;
  }
}
