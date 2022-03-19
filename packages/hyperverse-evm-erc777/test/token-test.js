const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');

let unitMultiple = new BigNumber.from(10).pow(new BigNumber.from(18));
let initialSupply = new BigNumber.from(1000000).mul(unitMultiple);

describe('Token', function () {
	let ERC777;
	let erc777ctr;
	let TokenFactory;
	let tokenFactoryCtr;
	let alice;
	let bob;
	let cara;
	let aliceProxyContract;

	const aliceInstance = {
		name: 'ALICE',
		symbol: 'ALC',
		initialSupply: initialSupply,
	};

	beforeEach(async () => {
		ERC777 = await ethers.getContractFactory('ERC777');
		[owner, alice, bob, cara] = await ethers.getSigners();

		erc777ctr = await ERC777.deploy(owner.address);
		await erc777ctr.deployed();

		TokenFactory = await ethers.getContractFactory('ERC777Factory');
		tokenFactoryCtr = await TokenFactory.deploy(erc777ctr.address, owner.address);
		await tokenFactoryCtr.deployed();

		await tokenFactoryCtr
			.connect(alice)
			.createInstance(
				aliceInstance.name,
				aliceInstance.symbol,
				[cara.address],
				aliceInstance.initialSupply,
				alice.address
			);

		const main = await ethers.getContractFactory('ERC777');
		aliceProxyContract = await main.attach(await tokenFactoryCtr.getProxy(alice.address));
	});

	describe('Initial State Variables', function () {
		it('Master Contract should match erc777ctr', async function () {
			expect(await tokenFactoryCtr.masterContract()).to.equal(erc777ctr.address);
		});

		it("Should match alice's initial token data", async function () {
			expect(await aliceProxyContract.name()).to.equal(aliceInstance.name);
			expect(await aliceProxyContract.symbol()).to.equal(aliceInstance.symbol);
			expect(await aliceProxyContract.decimals()).to.equal(18);
			expect(await aliceProxyContract.granularity()).to.equal(1);
		});

		it('Should assign all initial token to Alice', async function () {
			const aliceTotal = await aliceProxyContract.balanceOf(alice.address);
			expect(await aliceProxyContract.totalSupply()).to.equal(aliceTotal);
		});

		it("Should have Alice's proxy contract as a default operator", async function () {
			const defaultOps = await aliceProxyContract.defaultOperators();
			expect(defaultOps[0]).to.equal(cara.address);
			expect(defaultOps[1]).to.equal(aliceProxyContract.address);
		});
	});

	describe('ERC20 Functionality', function () {
		/* 
		TO DO : 
		- transfer function
		- transferFrom function
		- approve function
		- allowance function
		*/

		describe('Transfer', function () {
			it('Should be able to transfer funds using transfer()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(2000);

				const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

				const transferTxn = await aliceProxyContract
					.connect(alice)
					.transfer(tragetAccount, amount);

				const sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

				expect(sourceNewBal).to.not.equal(sourceOldBal);
				expect(targetNewBal).to.not.equal(targetOldBal);
				expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
			});
			it('Should approve funds tranfer using approve() and check spend amount using allowance()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(200).mul(unitMultiple);

				await aliceProxyContract.connect(alice).approve(tragetAccount, amount);

				const allowance = await aliceProxyContract.allowance(sourceAccount, tragetAccount);

				expect(allowance).to.equal(amount);
			});

			it('Should transfer allowance funds between accounts using tranferFrom()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const authorizedAccount = bob.address;
				const amount = new BigNumber.from(500).mul(unitMultiple);

				const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

				await aliceProxyContract.connect(alice).approve(authorizedAccount, amount);

				let oldAllowance = await aliceProxyContract.allowance(
					sourceAccount,
					authorizedAccount
				);

				await aliceProxyContract
					.connect(bob)
					.transferFrom(sourceAccount, tragetAccount, amount);

				let sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
				let targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

				let newAllowance = await aliceProxyContract.allowance(
					sourceAccount,
					authorizedAccount
				);

				expect(sourceNewBal).to.not.equal(sourceOldBal);
				expect(targetOldBal).to.not.equal(targetNewBal);
				expect(oldAllowance).to.not.equal(newAllowance);
				expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
				expect(newAllowance).to.equal(oldAllowance.sub(amount));
				expect(newAllowance).to.equal(0);
			});
			// it('Should not transfer funds between accounts using transferFrom() unless authorized', async function () {
			// 	const sourceAccount = alice.address;
			// 	const tragetAccount = cara.address;
			// 	const authorizedAccount = bob.address;
			// 	const amount = new BigNumber.from(2).mul(unitMultiple);

			// 	const transferTxn = await aliceProxyContract.connect(bob).transferFrom(sourceAccount, tragetAccount, amount);
			// 	await expect(
			// 		aliceProxyContract
			// 			.connect(bob)
			// 			.transferFrom(sourceAccount, tragetAccount, amount)
			// 	).to.be.revertedWith('Not enough allowed balance for transfer');
			// });
		});

		describe('Approve and allowance', async function () {
			it('Should be able to approve cara to spend alices tokens', async function () {
				const amount = new BigNumber.from(100);
				const approveTxn = await aliceProxyContract
					.connect(alice)
					.approve(cara.address, amount);

				const allowance = await aliceProxyContract.allowance(alice.address, cara.address);
				expect(allowance).to.equal(amount);
			});
		});
	});

	describe('ERC777 Functionality', function () {
		describe('Send() ERC777 Tokens', async function () {
			it('Should be able to transfer funds using transfer()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(1000);
				const data = ethers.utils.formatBytes32String('0x');

				const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

				const sendTxn = await aliceProxyContract
					.connect(alice)
					.send(tragetAccount, amount, data);

				const sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

				expect(sourceNewBal).to.not.equal(sourceOldBal);
				expect(targetOldBal).to.not.equal(targetNewBal);
				expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
			});
		});
	});
});
