const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

function generateMerkleRoot(signers) {
	const leafNodes = signers.map((signer) => keccak256(signer.address));
	const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
	return "0x" + merkleTree.getRoot().toString("hex");
}

function generateMerkleProof(signers, signer) {
	const leafNodes = signers.map((signer) => keccak256(signer.address));
	const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
	return merkleTree.getHexProof(keccak256(signer.address));
}

describe("SafuuX", function () {
	before(async function () {
		this.accounts = await ethers.getSigners();
		this.owner = this.accounts[0];
		this.GOLD_LIST = [...this.accounts.slice(0, 3)];
		this.WHITE_LIST = [...this.accounts.splice(3, 3)];
		const SafuuToken = await ethers.getContractFactory("TestERC20");
		this.safuuToken = await SafuuToken.deploy();
		await this.safuuToken.deployed();
		const SafuuX = await ethers.getContractFactory("SafuuX");
		this.safuux = await SafuuX.deploy(
			"Safuu",
			"Safuu",
			this.safuuToken.address,
			generateMerkleRoot(this.GOLD_LIST),
			generateMerkleRoot(this.WHITE_LIST),
			"ipfs://ipfs/...."
		);
		await this.safuux.deployed();
	});

	it("Should check properties match constructor", async function () {
		const tokenName = await this.safuux.name();
		const tokenSymbol = await this.safuux.symbol();
		expect(tokenName).to.equal("Safuu");
		expect(tokenSymbol).to.equal("Safuu");
		expect(await this.safuux._merkleTreeInputURI()).to.equal(
			"ipfs://ipfs/...."
		);
		expect(await this.safuux._goldListMerkleRoot()).to.equal(
			generateMerkleRoot(this.GOLD_LIST)
		);
		expect(await this.safuux._whiteListMerkleRoot()).to.equal(
			generateMerkleRoot(this.WHITE_LIST)
		);
		expect(await this.safuux._goldListMerkleRoot()).to.not.equal(
			await this.safuux._whiteListMerkleRoot()
		);
	});

	it("Should enable GoldList mint", async function () {
		expect(await this.safuux._isGoldListSaleActive()).to.equal(false);
		const saleStatus = await this.safuux.setGoldListSaleStatus(true);
		expect(await this.safuux._isGoldListSaleActive()).to.equal(true);
	});

	it("Should approve Safuu token", async function () {
		await this.safuuToken.approve(this.safuux.address, 1000000000000000);
		await this.safuuToken.connect(this.WHITE_LIST[0]).approve(this.safuux.address, 1000000000000000);
		await this.safuuToken.mint(this.WHITE_LIST[0].address, 100000);
	});

	it("Whitelist has a ETH blanace", async function () {
		const balance = await ethers.provider.getBalance(
			this.WHITE_LIST[0].address
		);
		expect(Number(await this.safuuToken.balanceOf(this.WHITE_LIST[0].address))).to.be.greaterThan(Number(0))
		expect(Number(balance)).to.greaterThan(Number(0));
	});

	it("Should mint from GoldList", async function () {
		//Check balance before mint
		const fullNodeBalBefore = await this.safuux.balanceOf(
			this.GOLD_LIST[0].address,
			1
		);
		const liteNodeBalBefore = await this.safuux.balanceOf(
			this.GOLD_LIST[0].address,
			2
		);

		expect(fullNodeBalBefore.toNumber()).to.equal(0);
		expect(liteNodeBalBefore.toNumber()).to.equal(0);

		//Mint 1 Full Node and 3 Lite Nodes
		const tx = await this.safuux.mintGoldList(
			1,
			3,
			generateMerkleProof(this.GOLD_LIST, this.GOLD_LIST[0])
		);

		//Check balance after mint
		const fullNodeBalAfter = await this.safuux.balanceOf(
			this.GOLD_LIST[0].address,
			1
		);
		const liteNodeBalAfter = await this.safuux.balanceOf(
			this.GOLD_LIST[0].address,
			2
		);

		expect(fullNodeBalAfter.toNumber()).to.equal(1);
		expect(liteNodeBalAfter.toNumber()).to.equal(3);
	});

	it("Should NOT be able to mint more than 1 Full Node", async function () {
		await expect(
			this.safuux.mintGoldList(
				1,
				3,
				generateMerkleProof(this.GOLD_LIST, this.GOLD_LIST[0])
			)
		).to.be.revertedWith("Exceeds max 1 Full Node limit per address");
	});

	it("Should NOT be able to mint more than 1 Full Node with Transfer", async function () {
		await this.safuux.safeTransferFrom(
			this.accounts[0].address,
			this.accounts[1].address,
			1,
			1,
			"0x74a2480e451fb1ec5b00c02140086c04994bc9366824b93aa8b1be2ececf9dcc"
		);
		await expect(
			this.safuux.mintGoldList(
				1,
				0,
				generateMerkleProof(this.GOLD_LIST, this.GOLD_LIST[0])
			)
		).to.be.revertedWith("Exceeds max 1 Full Node limit per address");
	});

	it("Should NOT mint from Whitelist while GoldList is active only", async function () {
		await expect(
			this.safuux.mintWhiteList(
				0,
				2,
				generateMerkleProof(this.WHITE_LIST, this.WHITE_LIST[0])
			)
		).to.be.revertedWith("WhiteList sale not active");
	});

	it("Should enable WhiteList mint", async function () {
		expect(await this.safuux._isWhiteListSaleActive()).to.equal(false);
		const saleStatus = this.safuux.setWhiteListSaleStatus(true);
		expect(await this.safuux._isWhiteListSaleActive()).to.equal(true);
	});

	it("Can change Token URI", async function () {
		await this.safuux.setURI(1, "https://safuu.com");
		await expect(await this.safuux.uri(1)).to.equal("https://safuu.com");
	});

	it("Should mint from WhiteList", async function () {
		//Check balance before mint
		const fullNodeBalBefore = await this.safuux
			.balanceOf(this.WHITE_LIST[0].address, 1);
		const liteNodeBalBefore = await this.safuux
			.balanceOf(this.WHITE_LIST[0].address, 2);

		expect(fullNodeBalBefore.toNumber()).to.equal(0);
		expect(liteNodeBalBefore.toNumber()).to.equal(0);

		//Mint 0 Full Node and 2 Lite Nodes
		const tx = await this.safuux
			.connect(this.WHITE_LIST[0])
			.mintWhiteList(
				0,
				1,
				generateMerkleProof(this.WHITE_LIST, this.WHITE_LIST[0])
			);

		//Check balance after mint
		const fullNodeBalAfter = await this.safuux
			.balanceOf(this.WHITE_LIST[0].address, 1);
		const liteNodeBalAfter = await this.safuux
			.balanceOf(this.WHITE_LIST[0].address, 2);

		expect(fullNodeBalAfter.toNumber()).to.equal(0);
		expect(liteNodeBalAfter.toNumber()).to.equal(1);
	});

	it("Should validate merklee proof", async function () {
		await expect(
			this.safuux.mintWhiteList(0, 1, generateMerkleProof(this.WHITE_LIST, this.WHITE_LIST[0]))
		).to.be.revertedWith("Address not eligible - Invalid merkle proof");
	});

	it("Should burn tokens", async function () {
		const currentLiteNodeBalance = await this.safuux.balanceOf(
			this.accounts[0].address,
			2
		);
		await this.safuux.burn(2, 1);
		const fullNodeBalAfter = await this.safuux.balanceOf(
			this.accounts[0].address,
			1
		);
		const liteNodeBalAfter = await this.safuux.balanceOf(
			this.accounts[0].address,
			2
		);

		expect(fullNodeBalAfter.toNumber()).to.equal(0);
		expect(liteNodeBalAfter.toNumber()).to.equal(currentLiteNodeBalance - 1);
	});

	it("Should burn tokens in batch", async function () {
		const currentLiteNodeBalance = await this.safuux.balanceOf(
			this.accounts[0].address,
			2
		);
		await this.safuux.burnBatch([2], [2]);
		const liteNodeBalAfter = await this.safuux.balanceOf(
			this.accounts[0].address,
			2
		);
		expect(liteNodeBalAfter.toNumber()).to.equal(currentLiteNodeBalance - 2);
	});
});
