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

contract ERC721 is
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

	// Account used to deploy contract
	address public immutable contractOwner;

	//stores the tenant owner
	address private _tenantOwner;

	Counters.Counter private tokenCounter;

	string private _name;
	string private _symbol;
	string private baseURI;
	uint256 public price;
	bool public isPublicSaleActive;

	mapping(uint256 => address) private _owners;
	mapping(address => uint256) private _balances;
	mapping(uint256 => address) private _tokenApprovals;
	mapping(address => mapping(address => bool)) private _operatorApprovals;

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
		if (isPublicSaleActive == false) {
			revert PublicMintInactive();
		}
		_;
	}

	modifier checkPayment() {
		if (msg.value != price) {
			revert InsufficientBalance();
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

	function mint(address _to)
		external
		payable
		nonReentrant
		checkMint
		checkPayment
		returns (uint256)
	{
		uint256 tokenId = nextTokenId();
		_safeMint(_to, tokenId);
		return tokenId;
	}

	function getBaseURI() external view returns (string memory) {
		return baseURI;
	}

	//TENANT OWNER FUNCTIONS
	function tenantMint(address _reciever) external isTenantOwner returns (uint256) {
		uint256 tokenId = nextTokenId();
		_safeMint(_reciever, tokenId);
		return tokenId;
	}

	function tenantMint(address _to, string calldata _uri)
		external
		isTenantOwner
		returns (uint256)
	{
		uint256 tokenId = nextTokenId();
		_safeMint(_to, tokenId);
		if (bytes(_uri).length > 0) {
			_tokenURIs[tokenId] = _uri;
		}

		return tokenId;
	}

	function setMintPrice(uint256 _price) external isTenantOwner {
		price = _price;
	}

	function setBaseURI(string memory baseURI_) external isTenantOwner {
		baseURI = baseURI_;
	}

	function setPublicSale(bool _isActive) external isTenantOwner {
		isPublicSaleActive = _isActive;
	}

	// HELPERS
	function nextTokenId() private returns (uint256) {
		tokenCounter.increment();
		return tokenCounter.current();
	}

	///TOKEN WITHDRAWAL
	function withdraw() public isTenantOwner {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

	function withdrawTokens(IERC20 _token) public isTenantOwner {
		uint256 balance = _token.balanceOf(address(this));
		_token.transfer(msg.sender, balance);
	}

	///FUNCTION OVERRIDES
	/**
	 * @dev See {IERC721Metadata-tokenURI}.
	 */
	function tokenURI(uint256 _tokenId) external view virtual override returns (string memory) {
		_requireMinted(_tokenId);

		string memory baseURI_ = _baseURI();
		return
			bytes(baseURI_).length > 0
				? string(abi.encodePacked(baseURI_, _tokenId.toString()))
				: '';
	}

	/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ERC721 METHODS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
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
		address owner = ERC721.ownerOf(_tokenId);
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
	 *
	 * `data` is additional data, it has no specified format and it is sent in call to `to`.
	 *
	 * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
	 * implement alternative mechanisms to perform token transfer, such as signature-based.
	 *
	 * Requirements:
	 *
	 * - `from` cannot be the zero address.
	 * - `to` cannot be the zero address.
	 * - `tokenId` token must exist and be owned by `from`.
	 * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
	 *
	 * Emits a {Transfer} event.
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
	 * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
	 *
	 * Tokens start existing when they are minted (`_mint`),
	 * and stop existing when they are burned (`_burn`).
	 */
	function _exists(uint256 _tokenId) internal view virtual returns (bool) {
		return _owners[_tokenId] != address(0);
	}

	/**
	 * @dev Returns whether `spender` is allowed to manage `tokenId`.
	 *
	 * Requirements:
	 *
	 * - `tokenId` must exist.
	 */
	function _isApprovedOrOwner(address _spender, uint256 _tokenId)
		internal
		view
		virtual
		returns (bool)
	{
		address owner = ERC721.ownerOf(_tokenId);
		return (_spender == owner ||
			isApprovedForAll(owner, _spender) ||
			getApproved(_tokenId) == _spender);
	}

	/**
	 * @dev Safely mints `tokenId` and transfers it to `to`.
	 *
	 * Requirements:
	 *
	 * - `tokenId` must not exist.
	 * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
	 *
	 * Emits a {Transfer} event.
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
	 *
	 * Requirements:
	 *
	 * - `tokenId` must not exist.
	 * - `to` cannot be the zero address.
	 *
	 * Emits a {Transfer} event.
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
	 *
	 * Requirements:
	 *
	 * - `tokenId` must exist.
	 *
	 * Emits a {Transfer} event.
	 */
	function _burn(uint256 _tokenId) internal virtual {
		address owner = ERC721.ownerOf(_tokenId);

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
	 *
	 * Requirements:
	 *
	 * - `to` cannot be the zero address.
	 * - `tokenId` token must be owned by `from`.
	 *
	 * Emits a {Transfer} event.
	 */
	function _transfer(
		address _from,
		address _to,
		uint256 _tokenId
	) internal virtual {
		if (ERC721.ownerOf(_tokenId) != _from) {
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
	 *
	 * Emits an {Approval} event.
	 */
	function _approve(address _to, uint256 _tokenId) internal virtual {
		_tokenApprovals[_tokenId] = _to;
		emit Approval(ERC721.ownerOf(_tokenId), _to, _tokenId);
	}

	/**
	 * @dev Approve `operator` to operate on all of `owner` tokens
	 *
	 * Emits an {ApprovalForAll} event.
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
