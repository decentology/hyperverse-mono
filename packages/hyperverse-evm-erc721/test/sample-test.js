const { ethers } = require('hardhat');
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { utils } = require('ethers');

describe('ERC721', function () {
	let ERC721;
	let erc721ctr;
	let ERC721Factory;
	let erc721factoryCtr;
	let alice;
	let bob;
	let owner;
	let aliceProxyContract;
	const price = 0.0005;

	beforeEach(async () => {
		[owner, alice, bob] = await ethers.getSigners();
		ERC721 = await ethers.getContractFactory('ERC721');
		erc721ctr = await ERC721.deploy(owner.address);
		await erc721ctr.deployed();

		ERC721Factory = await ethers.getContractFactory('ERC721Factory');
		erc721factoryCtr = await ERC721Factory.deploy(erc721ctr.address, owner.address);
		await erc721factoryCtr.deployed();

		await erc721factoryCtr.connect(alice).createInstance(alice.address, 'ALICE', 'ALC');
		aliceProxyContract = await ERC721.attach(await erc721factoryCtr.getProxy(alice.address));
	});

	it('Master Contract should match exampleNFTContract', async function () {
		expect(await erc721factoryCtr.masterContract()).to.equal(erc721ctr.address);
	});

	it("Should match alice's initial token data", async function () {
		expect(await aliceProxyContract.name()).to.equal('ALICE');
		expect(await aliceProxyContract.symbol()).to.equal('ALC');
	});

	it('Public mint', async function () {
		await aliceProxyContract
			.connect(alice)
			.initializeCollection(utils.parseEther(price.toString()), 50, 5, false);
		await aliceProxyContract.connect(alice).setMintPermissions(true);
		const collectionInfo = await aliceProxyContract.collectionInfo();
		expect(utils.formatEther(collectionInfo.price)).to.equals(price.toString());
		expect(collectionInfo.isPublicSaleActive).to.equals(true);
		await aliceProxyContract
			.connect(alice)
			.mint(bob.address, { value: utils.parseUnits(price.toString()) });
		expect(await aliceProxyContract.balanceOf(bob.address)).to.equals(1);
		const balance = await aliceProxyContract.provider.getBalance(aliceProxyContract.address);
		expect(utils.formatEther(balance)).to.equals(price.toString());
	});
	it('Can initializeCollectin more than once', async function () {
		await aliceProxyContract
			.connect(alice)
			.initializeCollection(utils.parseEther(price.toString()), 50, 5, false);

		await aliceProxyContract
			.connect(alice)
			.initializeCollection(
				utils.parseEther((price + 0.0001).toFixed(4).toString()),
				50,
				5,
				false
			);
		const collectionInfo = await aliceProxyContract.collectionInfo();
		expect(utils.formatEther(collectionInfo.price)).to.equals(
			(price + 0.0001).toFixed(4).toString()
		);
	});
	it('Batch Mint', async function () {
		await aliceProxyContract
			.connect(alice)
			.initializeCollection(utils.parseEther(price.toString()), 50, 5, false);
		await aliceProxyContract.connect(alice).setMintPermissions(true);
		await aliceProxyContract
			.connect(alice)
			.mintBatch(bob.address, 2, { value: utils.parseUnits((price * 2).toString()) });
		const counter = await aliceProxyContract.tokenCounter();
		expect(counter.toNumber()).to.equals(2);
	});
});
