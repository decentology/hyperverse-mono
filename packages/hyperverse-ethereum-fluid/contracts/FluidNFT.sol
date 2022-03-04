// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC721/ERC721.sol)
pragma solidity ^0.7.1;
pragma experimental ABIEncoderV2;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {ISuperfluid, ISuperToken, ISuperApp} from '@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol';
import {IConstantFlowAgreementV1} from '@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol';
import './MERC721.sol';

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract FluidNFT is MERC721, Ownable {
	ISuperfluid private _host; // host
	IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
	ISuperToken public _acceptedToken; // accepted token
	mapping(uint256 => int96) public flowRates;
	uint256 public nextId; //  (each stream has new id we store in flowRates)

	uint256 public tokenCounter;

	// Account used to deploy contract
	address public immutable contractOwner;

	//stores the tenant owner
	address private tenantOwner;

	// Have to put ERC721 here to truly inherit this contract
	// _safeMint only available `internal`ly which is
	// only possible if we call the constructor like this
	constructor() {
		contractOwner = msg.sender;
	}

	function init(
		string memory name_,
		string memory symbol_,
		address _tenant,
		ISuperfluid host,
		IConstantFlowAgreementV1 cfa,
		ISuperToken acceptedToken
	) external {
		merc721Init(name_, symbol_);
		_host = host;
		_cfa = cfa;
		_acceptedToken = acceptedToken;

		tenantOwner = _tenant;
		tokenCounter = 0;

		assert(address(_host) != address(0));
		assert(address(_cfa) != address(0));
		assert(address(_acceptedToken) != address(0));
	}

	event NFTIssued(uint256 tokenId, address receiver, int96 flowRate);

	// function createNFT(address to) public returns (uint256) {
	// 	require(msg.sender == tenantOwner, 'Only the Tenant owner can mint an NFT');

	// 	uint256 newNFTTokenId = tokenCounter;
	// 	//safely mint token for the person that called the function
	// 	_safeMint(to, newNFTTokenId);
	// 	//set the token uri of the token id of the uri passed
	// 	tokenURI(newNFTTokenId);
	// 	//increment the counter
	// 	tokenCounter = tokenCounter + 1;
	// 	//return the token id
	// 	return newNFTTokenId;
	// }

	// Example flow rate: 3858024691358

	function issueNFT(address receiver, int96 flowRate) public returns (uint256) {
		require(msg.sender == tenantOwner, 'Only the Tenant owner can mint an NFT');
		require(receiver != address(this), 'Issue to a new address');
		require(flowRate > 0, 'flowRate must be positive!');
		flowRates[tokenCounter] = flowRate;
		emit NFTIssued(tokenCounter, receiver, flowRates[tokenCounter]);
		uint256 newNFTTokenId = tokenCounter;
		//safely mint token for the person that called the function
		_setBaseURI('ipfs://QmR3nK6suuKmsgDZDraYF5JCJNUND3JHYgnYJXzGUohL9L/1.json');
		_safeMint(receiver, newNFTTokenId);
		//set the token uri of the token id of the uri passed
		tokenURI(newNFTTokenId);
		//increment the counter
		tokenCounter = tokenCounter + 1;
		//return the token id
		return newNFTTokenId;
	}

	function burnNFT(uint256 tokenId) external onlyOwner exists(tokenId) {
		address receiver = ownerOf(tokenId);

		int96 rate = flowRates[tokenId];
		delete flowRates[tokenId];
		_burn(tokenId);
		//deletes flow to previous holder of nft & receiver of stream after it is burned

		//we will reduce flow of owner of NFT by total flow rate that was being sent to owner of this token
		_reduceFlow(receiver, rate);
	}

	//Everytime token is transfered, the stream is moved to owner
	function _beforeTokenTransfer(
		address oldReceiver,
		address newReceiver,
		uint256 tokenId
	) internal override {
		//blocks transfers to superApps - done for simplicity, but you could support super apps in a new version!
		require(
			!_host.isApp(ISuperApp(newReceiver)) || newReceiver == address(this),
			'New receiver can not be a superApp'
		);

		// @dev delete flowRate of this token from old receiver
		// ignores minting case
		_reduceFlow(oldReceiver, flowRates[tokenId]);
		// @dev create flowRate of this token to new receiver
		// ignores return-to-issuer case
		_increaseFlow(newReceiver, flowRates[tokenId]);
	}

	/**************************************************************************
	 * Modifiers
	 *************************************************************************/

	modifier exists(uint256 tokenId) {
		require(_exists(tokenId), "token doesn't exist or has been burnt");
		_;
	}

	/**************************************************************************
	 * Library
	 *************************************************************************/
	//this will reduce the flow or delete it
	function _reduceFlow(address to, int96 flowRate) internal {
		if (to == address(this)) return;

		(, int96 outFlowRate, , ) = _cfa.getFlow(_acceptedToken, address(this), to);

		if (outFlowRate == flowRate) {
			_deleteFlow(address(this), to);
		} else if (outFlowRate > flowRate) {
			// reduce the outflow by flowRate;
			// shouldn't overflow, because we just checked that it was bigger.
			_updateFlow(to, outFlowRate - flowRate);
		}
		// won't do anything if outFlowRate < flowRate
	}

	//this will increase the flow or create it
	function _increaseFlow(address to, int96 flowRate) internal {
		(, int96 outFlowRate, , ) = _cfa.getFlow(_acceptedToken, address(this), to); //returns 0 if stream doesn't exist
		if (outFlowRate == 0) {
			_createFlow(to, flowRate);
		} else {
			// increase the outflow by flowRates[tokenId]
			_updateFlow(to, outFlowRate + flowRate);
		}
	}

	function _createFlow(address to, int96 flowRate) internal {
		if (to == address(this) || to == address(0)) return;
		_host.callAgreement(
			_cfa,
			abi.encodeWithSelector(
				_cfa.createFlow.selector,
				_acceptedToken,
				to,
				flowRate,
				new bytes(0) // placeholder
			),
			'0x'
		);
	}

	function _updateFlow(address to, int96 flowRate) internal {
		if (to == address(this) || to == address(0)) return;
		_host.callAgreement(
			_cfa,
			abi.encodeWithSelector(
				_cfa.updateFlow.selector,
				_acceptedToken,
				to,
				flowRate,
				new bytes(0) // placeholder
			),
			'0x'
		);
	}

	function _deleteFlow(address from, address to) internal {
		_host.callAgreement(
			_cfa,
			abi.encodeWithSelector(
				_cfa.deleteFlow.selector,
				_acceptedToken,
				from,
				to,
				new bytes(0) // placeholder
			),
			'0x'
		);
	}

	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');

		string memory currentBaseURI = baseURI();
		return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI)) : '';
	}

	function withdraw() public payable onlyOwner {
		(bool success, ) = payable(msg.sender).call{value: address(this).balance}('');
		require(success);
	}
}
