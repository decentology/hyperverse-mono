// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Tribes is IHyperverseModule {
	using Counters for Counters.Counter;
	using SafeMath for uint256;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	address public immutable contractOwner;
	address private tenantOwner;

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

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
	modifier isTenantOwner() {
		require(msg.sender == tenantOwner, 'You are not the tenant owner');
		_;
	}

	modifier isNotInATribe(address _user) {
		require(participants[_user] != 0, 'This member is not in a Tribe!');
		_;
	}

  modifier tribeExists(uint256 _tribeId) {
    require(tribeCounter.current() >= _tribeId, 'Tribe does not exist!');
    _;
  }

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Tribe Module',
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

	function addNewTribe(string memory _metadata) public isTenantOwner {
		tribeCounter.increment();
		uint256 newTribeId = tribeCounter.current();

		TribeData storage newTribe = allTribes[newTribeId];
		newTribe.metadata = _metadata;
		newTribe.tribeId = newTribeId;
		emit NewTribeCreated(_metadata);
	}

	function joinTribe(uint256 _tribeId) external tribeExists(_tribeId) {
		require(participants[msg.sender] == 0, 'User is already in a Tribe!');

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
