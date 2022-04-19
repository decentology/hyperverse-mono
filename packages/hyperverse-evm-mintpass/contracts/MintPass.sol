// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './hyperverse/IHyperverseModule.sol';
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintPass is ERC1155, Ownable, IHyperverseModule {
	string public _name;
  	string public _symbol;
	
	uint256 public tokenCounter;
	bool public initialized;
	
	mapping(uint => string) public tokenURI;
  
	// Account used to deploy contract
	address public immutable contractOwner;

	//stores the tenant owner
	address private tenantOwner;

  	constructor() ERC1155("ipfs://ipfs/") {
		contractOwner = msg.sender;
		
		metadata = ModuleMetadata(
			'Token',
			Author(msg.sender, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
  	}

	function init(
		string memory name_,
		string memory symbol_,
		address _tenant
	) external {
		require(!initialized, 'Already initialized the state.');
		_name = name_;
		_symbol = symbol_;
		initialized = true;
		tenantOwner = _tenant;
		tokenCounter = 0;
	}

	function mint(address _to, uint _id, uint _amount) external {
		require(msg.sender == tenantOwner, 'Only the Tenant owner can mint an NFT');
 	   _mint(_to, _id, _amount, "");
 	}

 	function mintBatch(address _to, uint[] memory _ids, uint[] memory _amounts) external {
		require(msg.sender == tenantOwner, 'Only the Tenant owner can mint an NFT');
		_mintBatch(_to, _ids, _amounts, "");
 	}

 	function burn(uint _id, uint _amount) external {
 	  	_burn(msg.sender, _id, _amount);
 	}

 	function burnBatch(uint[] memory _ids, uint[] memory _amounts) external {
 	  	_burnBatch(msg.sender, _ids, _amounts);
 	}

 	function burnForMint(address _from, uint[] memory _burnIds, uint[] memory _burnAmounts, uint[] memory _mintIds, uint[] memory _mintAmounts) external onlyOwner {
 	 	_burnBatch(_from, _burnIds, _burnAmounts);
 	  	_mintBatch(_from, _mintIds, _mintAmounts, "");
 	}

 	function setURI(uint _id, string memory _uri) external {
		require(msg.sender == tenantOwner, 'Only the Tenant owner can mint an NFT');
 	  	tokenURI[_id] = _uri;
 	  	emit URI(_uri, _id);
 	}

 	function uri(uint _id) public override view returns (string memory) {
 	  	return tokenURI[_id];
 	}
	 
	function name() public view returns (string memory) {
		return _name;
	}

	function symbol() public view returns (string memory) {
		return _symbol;
	}

}