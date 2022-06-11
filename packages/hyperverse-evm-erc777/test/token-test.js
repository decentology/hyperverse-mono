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
				alice.address,
				aliceInstance.name,
				aliceInstance.symbol,
				[cara.address],
				aliceInstance.initialSupply,
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
			const defaultOps = await aliceProxyContract.isOperatorFor(
				aliceProxyContract.address,
				alice.address
			);
			expect(defaultOps).to.equal(true);
		});
	});

	describe('ERC20 Functionality', function () {
		describe('Transfer', function () {
			it('Should be able to transfer funds using transfer()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(1000);

				const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

					await aliceProxyContract
					.connect(alice)
					.transfer(tragetAccount, amount);

				const sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

				expect(sourceNewBal).to.not.equal(sourceOldBal);
				expect(targetOldBal).to.not.equal(targetNewBal);
				expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
			});

			it('Should approve funds tranfer using approve() and check spend amount using allowance()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(10);

				await aliceProxyContract.connect(alice).approve(tragetAccount, amount);

				const allowance = await aliceProxyContract.allowance(sourceAccount, tragetAccount);

				expect(allowance).to.equal(amount);
			});

			it('Should transfer allowance funds between accounts using tranferFrom()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const authorizedAccount = bob.address;
				const amount = new BigNumber.from(10);

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

			it('Should not transfer funds between acounts using transferFrom() unless authorized', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(1);

				await expect(
					aliceProxyContract
						.connect(bob)
						.transferFrom(sourceAccount, tragetAccount, amount)
				).to.be.revertedWith('InsufficientAllowance()');
			});
		});
	});

	describe('ERC777 Functionality', function () {
		describe('Minting and Burning', function () {
			it('Should allow Alice to mint tokens and have the right balance', async function () {
				const oldBal = await aliceProxyContract.balanceOf(alice.address);
				const amount = new BigNumber.from(100);
				const newBal = oldBal.add(amount);

				await aliceProxyContract.connect(alice).mint(amount);

				const balance = await aliceProxyContract.balanceOf(alice.address);
				expect(balance).to.equal(newBal);
			});

			it("Should not allow Cara to mint tokens on Alice's proxy", async function () {
				const amount = new BigNumber.from(100);

				await expect(aliceProxyContract.connect(cara).mint(amount)).to.be.revertedWith(
					'Unauthorized()'
				);
			});

			it('Should allow Alice to burn tokens and have the right balance', async function () {
				const oldBal = await aliceProxyContract.balanceOf(alice.address);
				const amount = new BigNumber.from(100);
				const newBal = oldBal.sub(amount);
				const data = ethers.utils.formatBytes32String('0x');

				await aliceProxyContract.connect(alice).burn(amount, data);

				const balance = await aliceProxyContract.balanceOf(alice.address);
				expect(balance).to.equal(newBal);
			});
		});

		describe('Send() ERC777 Tokens', function () {
			it('Should be able to transfer funds using send()', async function () {
				const sourceAccount = alice.address;
				const tragetAccount = cara.address;
				const amount = new BigNumber.from(1000);
				const data = ethers.utils.formatBytes32String('0x');

				const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

				await aliceProxyContract.connect(alice).send(tragetAccount, amount, data);

				const sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
				const targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

				expect(sourceNewBal).to.not.equal(sourceOldBal);
				expect(targetOldBal).to.not.equal(targetNewBal);
				expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
			});
		});

		describe('Operator Functionalities', function () {
			const data = ethers.utils.formatBytes32String('0x');
			beforeEach(async function () {
				await aliceProxyContract.connect(alice).authorizeOperator(bob.address);
			});
			it("Should authorize Bob as an opertor for Alice's proxy", async function () {
				expect(await aliceProxyContract.isOperatorFor(bob.address, alice.address)).to.equal(
					true
				);
			});

			it("Should revoke Bob as an opertor for Alice's proxy", async function () {
				await aliceProxyContract.connect(alice).revokeOperator(bob.address);

				expect(await aliceProxyContract.isOperatorFor(bob.address, alice.address)).to.equal(
					false
				);
			});

			it("Should allow Bob to send Alice's tokens to Cara", async function () {
				const oldBalCara = await aliceProxyContract.balanceOf(cara.address);
				const oldBalAlice = await aliceProxyContract.balanceOf(alice.address);
				const amount = new BigNumber.from(100);

				await aliceProxyContract
					.connect(bob)
					.operatorSend(alice.address, cara.address, amount, data, data);

				const balanceCara = await aliceProxyContract.balanceOf(cara.address);
				const balanceAlice = await aliceProxyContract.balanceOf(alice.address);
				expect(balanceCara).to.equal(oldBalCara.add(amount));
				expect(balanceAlice).to.equal(oldBalAlice.sub(amount));
			});

			it('Should allow Bob to mint more tokens for Alice', async function () {
				const oldBal = await aliceProxyContract.balanceOf(alice.address);
				const amount = new BigNumber.from(100);
				const newBal = oldBal.add(amount);

				await aliceProxyContract
					.connect(bob)
					.operatorMint(alice.address, amount, data, data);

				const balance = await aliceProxyContract.balanceOf(alice.address);
				expect(balance).to.equal(newBal);
			});

			it("Should allow Bob to burn Alice's tokens", async function () {
				const oldBal = await aliceProxyContract.balanceOf(alice.address);
				const amount = new BigNumber.from(100);
				const newBal = oldBal.sub(amount);

				await aliceProxyContract
					.connect(bob)
					.operatorBurn(alice.address, amount, data, data);

				const balance = await aliceProxyContract.balanceOf(alice.address);
				expect(balance).to.equal(newBal);
			});
		});
	});
});
