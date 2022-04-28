// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './interfaces/IERC721.sol';
import './interfaces/IERC20.sol';
import './hyperverse/IHyperverseModule.sol';
import './hyperverse/Initializable.sol';
import './utils/Counters.sol';
import './utils/MerkleProof.sol';

contract Whitelist is IHyperverseModule, Initializable {
	using Counters for Counters.Counter;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	address public immutable contractOwner;
	address private tenantOwner;

	mapping(address => bool) public whitelistedAddresses;
	mapping(address => bool) public addressesClaimed;
	bool public active;
	Counters.Counter public claimedCounter;

	mapping(address => bool) private _operators;
	mapping(address => bool) private _revokedOperators;

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TIME AND QUANTITY BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	uint256 public startTime;
	uint256 public endTime;
	uint256 public units;
	bool public timeBased;
	bool public quantityBased;

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NFT AND TOKEN BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	IERC721 public ERC721;
	bool public nftBased;

	IERC20 public ERC20;
	bool public tokenBased;

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MERKLE BASED WHITELIST  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	bytes32 public merkleRoot;
	bool public merkleBased;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events
	event ActivatedWhitelist();
	event DeactivatedWhitelist();
	event NewAddressWhitelisted(address _user);
	event AuthorizedNewOperator(address _operator);
	event RevokedOperator(address _operator);

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unathorized();
	error WhitelistAlreadyActive();
	error WhitelistIsNotActive();
	error ZeroAddress();
	error AlreadyInitialized();
	error AlreadyClaimedWhitelist();
	error AlreadyInWhitelist();
	error NotInWhitelist();
	error AlreadyAnOperator();
	error CannotRevokeOperator();

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TIME AND QUANTITY BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	error WhitelistingAlreadyEnded();
	error WhitelistingNotStarted();
	error NoAvailableUnitsLeft();

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NFT AND TOKEN BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	error NotAnNFTOwner();
	error NoTokensFound();

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MERKLE BASED WHITELIST  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	error InvalidMerkleRoot();

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+modifiers
	modifier isTenantOwner() {
		if (msg.sender != tenantOwner) {
			revert Unathorized();
		}
		_;
	}

	modifier canInitialize(address _tenant) {
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
		if (!active) {
			revert WhitelistIsNotActive();
		}
		_;
	}

	modifier ValikeMerkleRoot(bytes32 _merkleRoot) {
		if (_merkleRoot == bytes32(0)) {
			revert InvalidMerkleRoot();
		}
		_;
	}

	modifier IsOperator(address _operator) {
		if (!_operators[_operator] || _operator == tenantOwner) {
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

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DEFAULT BASED  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	//tenant funcitonality
	function initialize(
		address _tenant,
		uint256 _startTime,
		uint256 _endTime,
		uint256 _units,
		address _ERC721,
		address _ERC20,
		bytes32 _merkleRoot
	) external initializer canInitialize(_tenant) {
		if (_units != 0) {
			units = _units;
			quantityBased = true;
		}

		if (_startTime != 0) {
			startTime = _startTime;
			endTime = _endTime;
			timeBased = true;
		}

		if (_ERC721 != address(0)) {
			ERC721 = IERC721(_ERC721);
			nftBased = true;
		}

		if (_ERC20 != address(0)) {
			ERC20 = IERC20(_ERC20);
			tokenBased = true;
		}

		if (_merkleRoot != bytes32(0)) {
			merkleRoot = _merkleRoot;
			merkleBased = true;
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

		if (nftBased) {
			if (ERC721.balanceOf(msg.sender) == 0) {
				revert NotAnNFTOwner();
			}
		}

		if (tokenBased) {
			if (ERC20.balanceOf(msg.sender) == 0) {
				revert NoTokensFound();
			}
		}

		whitelistedAddresses[msg.sender] = true;
		emit NewAddressWhitelisted(msg.sender);
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GENERAL FUCNTIONALITY  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	function checkMerkleWhitelist(address _user, bytes32[] calldata _merkleProof)
		public
		view
		returns (bool)
	{
		bytes32 leaf = keccak256(abi.encodePacked(_user));
		if (MerkleProof.verify(_merkleProof, merkleRoot, leaf)) {
			return true;
		}

		return false;
	}

	function claimWhitelist(address _user, bytes32[] calldata _merkleProof)
		public
		IsOperator(msg.sender)
		claimedWhitelist(_user)
		WhitelistActive
	{
		if (addressesClaimed[_user]) {
			revert AlreadyClaimedWhitelist();
		}

		if (merkleBased) {
			bytes32 leaf = keccak256(abi.encodePacked(_user));
			if (!MerkleProof.verify(_merkleProof, merkleRoot, leaf)) {
				revert NotInWhitelist();
			}
		}

		addressesClaimed[_user] = true;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN FUCNTIONALITY  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

	function updateMerkleRoot(bytes32 _merkleRoot)
		public
		isTenantOwner
		ValikeMerkleRoot(_merkleRoot)
	{
		merkleRoot = _merkleRoot;
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

	function authorizeOperator(address _operator) public isTenantOwner {
		if (_operator == tenantOwner || _operators[_operator]) {
			revert AlreadyAnOperator();
		}

		_operators[_operator] = true;
		emit AuthorizedNewOperator(_operator);
	}

	function revokeOperator(address _operator) public isTenantOwner {
		if (_operator == tenantOwner || !_operators[_operator]) {
			revert CannotRevokeOperator();
		}

		_operators[_operator] = false;
		emit RevokedOperator(_operator);
	}
}
