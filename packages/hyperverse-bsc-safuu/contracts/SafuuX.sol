// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SafuuX is ERC1155, Ownable {
	string public _name;
	string public _symbol;
	string public _whitelistUri;
	bytes32 public immutable _merkleRoot;

	uint256 public FULL_NODE_LIMIT = 500;
	uint256 public LITE_NODE_LIMIT = 1500;
	uint256 public FULL_NODE_CURRENT_SUPPLY;
	uint256 public LITE_NODE_CURRENT_SUPPLY;

	mapping(uint256 => string) public tokenURI;
	mapping(address => bool) public fullNodeClaimed;
	mapping(address => bool) public liteNodeClaimed;

	constructor(
		string memory name_,
		string memory symbol_,
		bytes32 merkleRoot_
	) ERC1155('') {
		_name = name_;
		_symbol = symbol_;
		_merkleRoot = merkleRoot_;
	}

	function mintFullNode(uint256 _amount, bytes32[] calldata merkleProof) external {
		require(_amount < 2, 'Max 1 Full Node tokens allowed per Whitelist address');
		require(
			FULL_NODE_CURRENT_SUPPLY + _amount <= FULL_NODE_LIMIT,
			'Purchase would exceed max Full Node supply'
		);
		require(fullNodeClaimed[msg.sender] == false, 'Token already claimed by this address');

		bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
		require(
			_checkEligibility(merkleProof, leaf) == true,
			'Address not eligible - Invalid merkle proof'
		);

		FULL_NODE_CURRENT_SUPPLY = FULL_NODE_CURRENT_SUPPLY + _amount;
		fullNodeClaimed[msg.sender] = true;
		_mint(msg.sender, 1, _amount, '');
	}

	function mintLiteNode(uint256 _amount, bytes32[] calldata merkleProof) external {
		require(_amount < 6, 'Max 5 Lite Node tokens allowed per Whitelist address');
		require(
			LITE_NODE_CURRENT_SUPPLY + _amount <= LITE_NODE_LIMIT,
			'Purchase would exceed max Lite Node supply'
		);
		require(liteNodeClaimed[msg.sender] == false, 'Token already claimed by this address');

		bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
		require(
			_checkEligibility(merkleProof, leaf) == true,
			'Address not eligible - Invalid merkle proof'
		);

		LITE_NODE_CURRENT_SUPPLY = LITE_NODE_CURRENT_SUPPLY + _amount;
		liteNodeClaimed[msg.sender] = true;
		_mint(msg.sender, 2, _amount, '');
	}

	function checkEligibility(bytes32[] calldata merkleProof) external view returns (bool) {
		bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
		bool eligibility = _checkEligibility(merkleProof, leaf);
		return eligibility;
	}

	function _checkEligibility(bytes32[] calldata merkleProof, bytes32 leaf)
		internal
		view
		returns (bool)
	{
		return (MerkleProof.verify(merkleProof, _merkleRoot, leaf));
	}

	function burn(uint256 _id, uint256 _amount) external {
		_burn(msg.sender, _id, _amount);
	}

	function burnBatch(uint256[] memory _ids, uint256[] memory _amounts) external {
		_burnBatch(msg.sender, _ids, _amounts);
	}

	function burnForMint(
		address _from,
		uint256[] memory _burnIds,
		uint256[] memory _burnAmounts,
		uint256[] memory _mintIds,
		uint256[] memory _mintAmounts
	) external onlyOwner {
		_burnBatch(_from, _burnIds, _burnAmounts);
		_mintBatch(_from, _mintIds, _mintAmounts, '');
	}

	function setURI(uint256 _id, string memory _uri) external onlyOwner {
		tokenURI[_id] = _uri;
		emit URI(_uri, _id);
	}

	function uri(uint256 _id) public view override returns (string memory) {
		return tokenURI[_id];
	}

	function name() public view returns (string memory) {
		return _name;
	}

	function symbol() public view returns (string memory) {
		return _symbol;
	}

	function withdrawFunds() public onlyOwner {
		payable(msg.sender).transfer(address(this).balance);
	}

	function withdrawERC20(
		IERC20 tokenContract,
		address to,
		uint256 amount
	) external onlyOwner {
		tokenContract.transfer(to, amount);
	}
}
