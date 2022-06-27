// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';
import './hyperverse/Initializable.sol';
import './utils/Counters.sol';
import './utils/Strings.sol';
import './utils/Address.sol';
import './utils/Context.sol';
import './helper/ERC165.sol';
import './helper/ReentrancyGuard.sol';

import './interface/IERC721Metadata.sol';
import './interface/IERC721.sol';
import './interface/IERC721Receiver.sol';
import './interface/IERC20.sol';

contract NFTGame is
	Context,
	ERC165,
	IERC721,
	IERC721Metadata,
	ReentrancyGuard,
	Initializable,
	IHyperverseModule
{
	using Counters for Counters.Counter;
	using Strings for uint256;
	using Address for address;

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	struct CollectionInfo {
		uint256 price;
		uint256 maxSupply;
		uint256 maxPerUser;
		bool isPublicSaleActive;
	}

	struct TokenAttributes {
		uint256 tokenId;
		string name;
		uint256 eyeId;
		uint256 mouthId;
		uint256 bodyId;
	}

	address public immutable contractOwner;

	address public _tenantOwner;

	Counters.Counter private tokenCounter;

	string private _name;
	string private _symbol;
	string private baseURI;
	bool public isPublicSaleActive;

	bool private _isCollection; // true if contract is an NFT collection
	CollectionInfo public _collectionInfo;

	mapping(uint256 => address) private _owners;
	mapping(address => uint256) private _balances;
	mapping(uint256 => address) private _tokenApprovals;
	mapping(address => mapping(address => bool)) private _operatorApprovals;
	mapping(uint256 => TokenAttributes) private _tokenAttribute;

	// Mapping for individual token URIs
	mapping(uint256 => string) internal _tokenURIs;
	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	///+events

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	error Unauthorized();
	error AlreadyInitialized();
	error ZeroAddress();
	error SameAddress();
	error InsufficientBalance();
	error InsufficientAllowance();
	error PublicMintInactive();
	error InvalidTokenId();
	error MissingERC721Receiver();
	error TokenAlreadyMinted();
	error IncorrectOwner();
	error SameOwnerAndOperator();
	error MaxSupplyExceeded();
	error MaxPerUserExceeded();
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

	modifier mintCheck() {
		if (isPublicSaleActive == false) {
			revert PublicMintInactive();
		}
		_;
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'NFTGame',
			Author(_owner, 'https://externallink.net'),
			'0.0.1',
			3479831479814,
			'https://externalLink.net'
		);
		contractOwner = _owner;
	}

	/**
	 * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
	 */
	function initialize(
		string memory name_,
		string memory symbol_,
		address tenant_
	) external initializer canInitialize(tenant_) {
		_name = name_;
		_symbol = symbol_;
		_tenantOwner = tenant_;
	}

	/**
	 * @dev used for public minting of tokens for collection types.
	 */
	function mint(
		address _to,
		string memory _tokenName,
		uint256 _eyeId,
		uint256 _mouthId,
		uint256 _bodyId
	) external payable nonReentrant mintCheck returns (uint256) {
		uint256 tokenId = nextTokenId();
		_tokenAttribute[tokenId] = TokenAttributes(tokenId, _tokenName, _eyeId, _mouthId, _bodyId);
		_safeMint(_to, tokenId);
		return tokenId;
	}

	function getAttributesByTokenId(uint256 _tokenId)
		public
		view
		returns (
			uint256,
			string memory,
			uint256,
			uint256,
			uint256
		)
	{
		TokenAttributes storage tokenAttributes = _tokenAttribute[_tokenId];
		return (
			tokenAttributes.tokenId,
			tokenAttributes.name,
			tokenAttributes.eyeId,
			tokenAttributes.mouthId,
			tokenAttributes.bodyId
		);
	}

	function getBaseURI() public view returns (string memory) {
		return bytes(baseURI).length > 0 ? baseURI : '';
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ T E N A N T  F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

	/**
	 * @dev tenant ownly minting function, used to mint a token with a tokenURI based on the baseURI and the tokenID
	 * use case: Collection Minting
	 */
	function tenantMint(
		address _reciever,
		string memory _tokenName,
		uint256 _eyeId,
		uint256 _mouthId,
		uint256 _bodyId
	) external isTenantOwner returns (uint256) {
		uint256 tokenId = nextTokenId();
		_tokenAttribute[tokenId] = TokenAttributes(tokenId, _tokenName, _eyeId, _mouthId, _bodyId);
		_safeMint(_reciever, tokenId);
		return tokenId;
	}

	function setBaseURI(string memory baseURI_) external isTenantOwner {
		baseURI = baseURI_;
	}

	/**
	 * Can only set mint permissions if the contract is a collection
	 */
	function setMintPermissions(bool _isActive) external isTenantOwner {
		isPublicSaleActive = _isActive;
	}

	function withdraw() public isTenantOwner {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

	function withdrawTokens(IERC20 _token) public isTenantOwner {
		uint256 balance = _token.balanceOf(address(this));
		_token.transfer(msg.sender, balance);
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ H E L P E R  F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	function nextTokenId() private returns (uint256) {
		tokenCounter.increment();
		return tokenCounter.current();
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ O V E R R I D E S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	/**
	 * @dev See {IERC721Metadata-tokenURI}.
	 */
	function tokenURI(uint256 _tokenId) external view virtual override returns (string memory) {
		_requireMinted(_tokenId);

		if (!_isCollection) {
			return bytes(_tokenURIs[_tokenId]).length > 0 ? _tokenURIs[_tokenId] : '';
		}

		string memory baseURI_ = getBaseURI();
		return
			bytes(baseURI_).length > 0
				? string(abi.encodePacked(baseURI_, _tokenId.toString()))
				: '';
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R C 7 2 1   M E T H O D S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
	/**
	 * @dev See {IERC165-supportsInterface}.
	 */
	function supportsInterface(bytes4 _interfaceId)
		public
		view
		virtual
		override(ERC165, IERC165)
		returns (bool)
	{
		return
			_interfaceId == type(IERC721).interfaceId ||
			_interfaceId == type(IERC721Metadata).interfaceId ||
			super.supportsInterface(_interfaceId);
	}

	/**
	 * @dev See {IERC721-balanceOf}.
	 */
	function balanceOf(address _owner) public view virtual override returns (uint256) {
		if (_owner == address(0)) {
			revert ZeroAddress();
		}

		return _balances[_owner];
	}

	/**
	 * @dev See {IERC721-ownerOf}.
	 */
	function ownerOf(uint256 _tokenId) public view virtual override returns (address) {
		address owner = _owners[_tokenId];
		if (owner == address(0)) {
			revert InvalidTokenId();
		}
		return owner;
	}

	/**
	 * @dev See {IERC721Metadata-name}.
	 */
	function name() public view virtual override returns (string memory) {
		return _name;
	}

	/**
	 * @dev See {IERC721Metadata-symbol}.
	 */
	function symbol() public view virtual override returns (string memory) {
		return _symbol;
	}

	/**
	 * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
	 * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
	 * by default, can be overridden in child contracts.
	 */
	function _baseURI() internal view virtual returns (string memory) {
		return '';
	}

	/**
	 * @dev See {IERC721-approve}.
	 */
	function approve(address _to, uint256 _tokenId) public virtual override {
		address owner = NFTGame.ownerOf(_tokenId);
		if (owner == _to) {
			revert SameAddress();
		}

		if (_msgSender() != owner || !isApprovedForAll(owner, _msgSender())) {
			revert Unauthorized();
		}

		_approve(_to, _tokenId);
	}

	/**
	 * @dev See {IERC721-getApproved}.
	 */
	function getApproved(uint256 _tokenId) public view virtual override returns (address) {
		_requireMinted(_tokenId);

		return _tokenApprovals[_tokenId];
	}

	/**
	 * @dev See {IERC721-setApprovalForAll}.
	 */
	function setApprovalForAll(address _operator, bool _approved) public virtual override {
		_setApprovalForAll(_msgSender(), _operator, _approved);
	}

	/**
	 * @dev See {IERC721-isApprovedForAll}.
	 */
	function isApprovedForAll(address _owner, address _operator)
		public
		view
		virtual
		override
		returns (bool)
	{
		return _operatorApprovals[_owner][_operator];
	}

	/**
	 * @dev See {IERC721-transferFrom}.
	 */
	function transferFrom(
		address _from,
		address _to,
		uint256 _tokenId
	) public virtual override {
		if (!(_isApprovedOrOwner(_msgSender(), _tokenId))) {
			revert Unauthorized();
		}

		_transfer(_from, _to, _tokenId);
	}

	/**
	 * @dev See {IERC721-safeTransferFrom}.
	 */
	function safeTransferFrom(
		address _from,
		address _to,
		uint256 _tokenId
	) public virtual override {
		safeTransferFrom(_from, _to, _tokenId, '');
	}

	/**
	 * @dev See {IERC721-safeTransferFrom}.
	 */
	function safeTransferFrom(
		address _from,
		address _to,
		uint256 _tokenId,
		bytes memory _data
	) public virtual override {
		if (!(_isApprovedOrOwner(_msgSender(), _tokenId))) {
			revert Unauthorized();
		}

		_safeTransfer(_from, _to, _tokenId, _data);
	}

	/**
	 * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
	 * are aware of the ERC721 protocol to prevent tokens from being forever locked.
	 */
	function _safeTransfer(
		address _from,
		address _to,
		uint256 _tokenId,
		bytes memory _data
	) internal virtual {
		_transfer(_from, _to, _tokenId);

		if (!_checkOnERC721Received(_from, _to, _tokenId, _data)) {
			revert MissingERC721Receiver();
		}
	}

	/**
	 * @dev Returns whether `tokenId` exists.
	 *
	 */
	function _exists(uint256 _tokenId) internal view virtual returns (bool) {
		return _owners[_tokenId] != address(0);
	}

	/**
	 * @dev Returns whether `spender` is allowed to manage `tokenId`.
	 *
	 */
	function _isApprovedOrOwner(address _spender, uint256 _tokenId)
		internal
		view
		virtual
		returns (bool)
	{
		address owner = NFTGame.ownerOf(_tokenId);
		return (_spender == owner ||
			isApprovedForAll(owner, _spender) ||
			getApproved(_tokenId) == _spender);
	}

	/**
	 * @dev Safely mints `tokenId` and transfers it to `to`.
	 *
	 */
	function _safeMint(address _to, uint256 _tokenId) internal virtual {
		_safeMint(_to, _tokenId, '');
	}

	/**
	 * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
	 * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
	 */
	function _safeMint(
		address _to,
		uint256 _tokenId,
		bytes memory _data
	) internal virtual {
		_mint(_to, _tokenId);

		if (!_checkOnERC721Received(address(0), _to, _tokenId, _data)) {
			revert MissingERC721Receiver();
		}
	}

	/**
	 * @dev Mints `tokenId` and transfers it to `to`.
	 *
	 * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
	 */
	function _mint(address _to, uint256 _tokenId) internal virtual {
		if (_to == address(0)) {
			revert ZeroAddress();
		}

		if (_exists(_tokenId)) {
			revert TokenAlreadyMinted();
		}

		_beforeTokenTransfer(address(0), _to, _tokenId);

		_balances[_to] += 1;
		_owners[_tokenId] = _to;

		emit Transfer(address(0), _to, _tokenId);

		_afterTokenTransfer(address(0), _to, _tokenId);
	}

	/**
	 * @dev Destroys `tokenId`.
	 * The approval is cleared when the token is burned.
	 */
	function _burn(uint256 _tokenId) internal virtual {
		address owner = NFTGame.ownerOf(_tokenId);

		_beforeTokenTransfer(owner, address(0), _tokenId);

		// Clear approvals
		_approve(address(0), _tokenId);

		_balances[owner] -= 1;
		delete _owners[_tokenId];

		emit Transfer(owner, address(0), _tokenId);

		_afterTokenTransfer(owner, address(0), _tokenId);
	}

	/**
	 * @dev Transfers `tokenId` from `from` to `to`.
	 *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
	 */
	function _transfer(
		address _from,
		address _to,
		uint256 _tokenId
	) internal virtual {
		if (NFTGame.ownerOf(_tokenId) != _from) {
			revert IncorrectOwner();
		}

		if (_to == address(0)) {
			revert ZeroAddress();
		}
		_beforeTokenTransfer(_from, _to, _tokenId);

		// Clear approvals from the previous owner
		_approve(address(0), _tokenId);

		_balances[_from] -= 1;
		_balances[_to] += 1;
		_owners[_tokenId] = _to;

		emit Transfer(_from, _to, _tokenId);

		_afterTokenTransfer(_from, _to, _tokenId);
	}

	/**
	 * @dev Approve `to` to operate on `tokenId`
	 */
	function _approve(address _to, uint256 _tokenId) internal virtual {
		_tokenApprovals[_tokenId] = _to;
		emit Approval(NFTGame.ownerOf(_tokenId), _to, _tokenId);
	}

	/**
	 * @dev Approve `operator` to operate on all of `owner` tokens
	 */
	function _setApprovalForAll(
		address _owner,
		address _operator,
		bool _approved
	) internal virtual {
		if (_operator == address(0)) {
			revert ZeroAddress();
		}
		if (_owner == _operator) {
			revert SameOwnerAndOperator();
		}

		_operatorApprovals[_owner][_operator] = _approved;
		emit ApprovalForAll(_owner, _operator, _approved);
	}

	/**
	 * @dev Reverts if the `tokenId` has not been minted yet.
	 */
	function _requireMinted(uint256 _tokenId) internal view virtual {
		if (!_exists(_tokenId)) {
			revert InvalidTokenId();
		}
	}

	/**
	 * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
	 * The call is not executed if the target address is not a contract.
	 *
	 * @param _from address representing the previous owner of the given token ID
	 * @param _to target address that will receive the tokens
	 * @param _tokenId uint256 ID of the token to be transferred
	 * @param _data bytes optional data to send along with the call
	 * @return _bool whether the call correctly returned the expected magic value
	 */
	function _checkOnERC721Received(
		address _from,
		address _to,
		uint256 _tokenId,
		bytes memory _data
	) private returns (bool) {
		if (_to.isContract()) {
			try
				IERC721Receiver(_to).onERC721Received(_msgSender(), _from, _tokenId, _data)
			returns (bytes4 retval) {
				return retval == IERC721Receiver.onERC721Received.selector;
			} catch (bytes memory reason) {
				if (reason.length == 0) {
					revert MissingERC721Receiver();
				} else {
					/// @solidity memory-safe-assembly
					assembly {
						revert(add(32, reason), mload(reason))
					}
				}
			}
		} else {
			return true;
		}
	}

	/**
	 * @dev Hook that is called before any token transfer. This includes minting
	 * and burning.
	 *
	 * Calling conditions:
	 *
	 * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
	 * transferred to `to`.
	 * - When `from` is zero, `tokenId` will be minted for `to`.
	 * - When `to` is zero, ``from``'s `tokenId` will be burned.
	 * - `from` and `to` are never both zero.
	 *
	 * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
	 */
	function _beforeTokenTransfer(
		address _from,
		address _to,
		uint256 _tokenId
	) internal virtual {}

	/**
	 * @dev Hook that is called after any transfer of tokens. This includes
	 * minting and burning.
	 *
	 * Calling conditions:
	 *
	 * - when `from` and `to` are both non-zero.
	 * - `from` and `to` are never both zero.
	 *
	 * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
	 */
	function _afterTokenTransfer(
		address _from,
		address _to,
		uint256 _tokenId
	) internal virtual {}
}
