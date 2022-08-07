// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SafuuX is ERC1155, Ownable {
    string public _name;
    string public _symbol;
    string public _merkleTreeInputURI;
    bool public _isGoldListSaleActive = false;
    bool public _isWhiteListSaleActive = false;
    bytes32 public immutable _goldListMerkleRoot;
    bytes32 public immutable _whiteListMerkleRoot;
    address public _safuuTokenAddress;

    uint256 public LITE_NODE_COST = 50;
    uint256 public FULL_NODE_COST = 500;
    uint256 public FULL_NODE_LIMIT = 500;
    uint256 public LITE_NODE_LIMIT = 1500;
    uint256 public FULL_NODE_CURRENT_SUPPLY;
    uint256 public LITE_NODE_CURRENT_SUPPLY;

    mapping(uint256 => string) public tokenURI;
    mapping(address => bool) public nodesClaimed;
    mapping(address => uint256) public _fullNodesClaimed;
    mapping(address => uint256) public _liteNodesClaimed;

    modifier mintFullNodeCheck(uint256 _amount) {
        require(
            _fullNodesClaimed[msg.sender] + _amount < 2,
            "Exceeds max 1 Full Node limit per address"
        );
        require(
            FULL_NODE_CURRENT_SUPPLY + 1 <= FULL_NODE_LIMIT,
            "Purchase would exceed max Full Node supply"
        );
        require(
            IERC20(_safuuTokenAddress).balanceOf(msg.sender) >= FULL_NODE_COST,
            "Insufficient balance"
        );
        _;
    }

    modifier mintLiteNodeCheck(uint256 _amount) {
        require(
            _liteNodesClaimed[msg.sender] + _amount < 6,
            "Exceeds max 5 Lite Node limit per address"
        );
        require(
            LITE_NODE_CURRENT_SUPPLY + _amount <= LITE_NODE_LIMIT,
            "Purchase would exceed max Lite Node supply"
        );
        require(
            nodesClaimed[msg.sender] == false,
            "Max 1 FullNode, 5 LiteNodes per wallet"
        );
        require(
            IERC20(_safuuTokenAddress).balanceOf(msg.sender) >=
                LITE_NODE_COST * _amount,
            "Insufficient balance"
        );
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        address safuuTokenAddress_,
        bytes32 goldListMerkleRoot_,
        bytes32 whiteListMerkleRoot_,
        string memory merkleTreeInputURI_
    ) ERC1155("") {
        _name = name_;
        _symbol = symbol_;
        _safuuTokenAddress = safuuTokenAddress_;
        _merkleTreeInputURI = merkleTreeInputURI_;
        _goldListMerkleRoot = goldListMerkleRoot_;
        _whiteListMerkleRoot = whiteListMerkleRoot_;

        FULL_NODE_CURRENT_SUPPLY = 5;
        //_mint(msg.sender, 1, 5, "");
    }

    function mintGoldList(
        uint256 _fullNodeCount,
        uint256 _liteNodeCount,
        bytes32[] calldata merkleProof
    ) external {
        require(_isGoldListSaleActive == true, "GoldList sale not active");
        require(
            nodesClaimed[msg.sender] == false,
            "Max 1 FullNode, 5 LiteNodes per wallet"
        );
        require(
            _fullNodeCount > 0 || _liteNodeCount > 0,
            "Full node and Lite node count cannot be zero"
        );
        if (_fullNodeCount > 0) {
            _mintFullNode(_fullNodeCount, _goldListMerkleRoot, merkleProof);
        }
        if (_liteNodeCount > 0) {
            _mintLiteNode(_liteNodeCount, _goldListMerkleRoot, merkleProof);
        }
    }

    function mintWhiteList(
        uint256 _fullNodeCount,
        uint256 _liteNodeCount,
        bytes32[] calldata merkleProof
    ) external {
        require(_isWhiteListSaleActive == true, "WhiteList sale not active");
        require(
            nodesClaimed[msg.sender] == false,
            "Max 1 FullNode, 5 LiteNodes per wallet"
        );
        require(
            _fullNodeCount > 0 || _liteNodeCount > 0,
            "Full node and Lite node count cannot be zero"
        );
        if (_fullNodeCount > 0) {
            _mintFullNode(_fullNodeCount, _whiteListMerkleRoot, merkleProof);
        }
        if (_liteNodeCount > 0) {
            _mintLiteNode(_liteNodeCount, _whiteListMerkleRoot, merkleProof);
        }
    }

    function _mintFullNode(
        uint256 _amount,
        bytes32 _merkleRoot,
        bytes32[] calldata merkleProof
    ) internal mintFullNodeCheck(_amount) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            _checkEligibility(_merkleRoot, merkleProof, leaf) == true,
            "Address not eligible - Invalid merkle proof"
        );

        FULL_NODE_CURRENT_SUPPLY = FULL_NODE_CURRENT_SUPPLY + _amount;
        if (
            _fullNodesClaimed[msg.sender] + _amount == 1 &&
            _liteNodesClaimed[msg.sender] == 5
        ) {
            nodesClaimed[msg.sender] = true;
        }

        _fullNodesClaimed[msg.sender] = _fullNodesClaimed[msg.sender] + _amount;
        IERC20(_safuuTokenAddress).transferFrom(
            msg.sender,
            address(this),
            FULL_NODE_COST
        );
        _mint(msg.sender, 1, _amount, "");
    }

    function _mintLiteNode(
        uint256 _amount,
        bytes32 _merkleRoot,
        bytes32[] calldata _merkleProof
    ) internal mintLiteNodeCheck(_amount) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            _checkEligibility(_merkleRoot, _merkleProof, leaf) == true,
            "Address not eligible - Invalid merkle proof"
        );

        LITE_NODE_CURRENT_SUPPLY = LITE_NODE_CURRENT_SUPPLY + _amount;

        if (
            _liteNodesClaimed[msg.sender] + _amount == 5 &&
            _fullNodesClaimed[msg.sender] == 1
        ) {
            nodesClaimed[msg.sender] = true;
        }

        _liteNodesClaimed[msg.sender] = _liteNodesClaimed[msg.sender] + _amount;
        IERC20(_safuuTokenAddress).transferFrom(
            msg.sender,
            address(this),
            LITE_NODE_COST * _amount
        );
        _mint(msg.sender, 2, _amount, "");
    }

    function checkGoldListEligibility(
        address walletAddress,
        bytes32[] calldata merkleProof
    ) external view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(walletAddress));
        bool eligibility = _checkEligibility(
            _goldListMerkleRoot,
            merkleProof,
            leaf
        );
        return eligibility;
    }

    function checkWhiteListEligibility(
        address walletAddress,
        bytes32[] calldata merkleProof
    ) external view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(walletAddress));
        bool eligibility = _checkEligibility(
            _whiteListMerkleRoot,
            merkleProof,
            leaf
        );
        return eligibility;
    }

    function _checkEligibility(
        bytes32 merkleRoot,
        bytes32[] calldata merkleProof,
        bytes32 leaf
    ) internal pure returns (bool) {
        return (MerkleProof.verify(merkleProof, merkleRoot, leaf));
    }

    function getMerkleTreeInputURI() public view returns (string memory) {
        return _merkleTreeInputURI;
    }

    function setGoldListSaleStatus(bool _isActive) external onlyOwner {
        _isWhiteListSaleActive = false;
        _isGoldListSaleActive = _isActive;
    }

    function setWhiteListSaleStatus(bool _isActive) external onlyOwner {
        _isGoldListSaleActive = false;
        _isWhiteListSaleActive = _isActive;
    }

    function setFullNodeCost(uint256 cost) external onlyOwner {
        FULL_NODE_COST = cost;
    }

    function setLiteNodeCost(uint256 cost) external onlyOwner {
        LITE_NODE_COST = cost;
    }

    function burn(uint256 _id, uint256 _amount) external {
        _burn(msg.sender, _id, _amount);
    }

    function burnBatch(uint256[] memory _ids, uint256[] memory _amounts)
        external
    {
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
        _mintBatch(_from, _mintIds, _mintAmounts, "");
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

    function withdrawTokens(IERC20 tokenContract, address to)
        external
        onlyOwner
    {
        tokenContract.transfer(to, tokenContract.balanceOf(address(this)));
    }
}
