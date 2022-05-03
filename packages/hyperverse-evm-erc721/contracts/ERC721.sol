// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './MERC721.sol';
import './hyperverse/IHyperverseModule.sol';
import './hyperverse/Initializable.sol';
import './utils/SafeMath.sol';
import './utils/Counters.sol';

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ERC721 is MERC721, IHyperverseModule, Initializable {
	using SafeMath for uint256;
	using Counters for Counters.Counter;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	// Account used to deploy contract
	address public immutable contractOwner;

	//stores the tenant owner
	address private _tenantOwner;

	Counters.Counter public tokenCounter;
	bool public publicMint;

	// Have to put ERC721 here to truly inherit this contract
	// _safeMint only available `internal`ly which is
	// only possible if we call the constructor like this

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

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

	modifier checkMint() {
		if (publicMint == false && msg.sender != _tenantOwner) {
			revert Unauthorized();
		}
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'ERC721',
			Author(_owner, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
		contractOwner = _owner;
	}

	function initialize(
		string memory name_,
		string memory symbol_,
		address _tenant
	) external initializer canInitialize(_tenant) {
		merc721Init(name_, symbol_);
		_tenantOwner = _tenant;
	}

	function togglePublicMint() external isTenantOwner {
		publicMint = !publicMint;
	}

	function mint(address _to) public checkMint returns (uint256) {
		if (_to == address(0)) {
			revert ZeroAddress();
		}

		uint256 tokenId = tokenCounter.current();
		//safely mint token for the person that called the function
		_safeMint(_to, tokenId);
		//set the token uri of the token id of the uri passed
		tokenURI(tokenId);
		//increment the counter
		tokenCounter.increment();
		//return the token id
		return tokenId;
	}
}
