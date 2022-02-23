const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');
const { advanceBlockTo } = require('./helpers')
const tokenAbi = require('./utils/tokenAbi.json');


describe('StakeRewards Testing', function () {
	//Staking Contracts
	let StakeRewards;
	let stakeRewardsCtr;
	let Factory;
	let factoryCtr;

	//Mockup Token Contracts for Setup
	let MockupToken;

	let AliceTenant;
	//Test Accounts
	let owner;
	let alice;
	let bob;
	let cara;

	const rewardRate = 100;

	beforeEach(async function () {
		StakeRewards = await ethers.getContractFactory('StakeRewardsToken');
		[owner, alice, bob, cara] = await ethers.getSigners();
		stakeRewardsCtr = await StakeRewards.deploy(owner.address);
		await stakeRewardsCtr.deployed();

		Factory = await ethers.getContractFactory('StakeRewardsFactory');
		factoryCtr = await Factory.deploy(stakeRewardsCtr.address, owner.address);
		await factoryCtr.deployed();

		MockupToken = await deployMockContract(owner, tokenAbi.abi);

		await factoryCtr
			.connect(alice)
			.createInstance(alice.address, MockupToken.address, MockupToken.address, rewardRate);

		const stakeMainCtr = await ethers.getContractFactory('StakeRewardsToken');
		AliceTenant = await stakeMainCtr.attach(await factoryCtr.getProxy(alice.address));
	});

	describe('Initial State Variables', function () {
		it('Master Contract should match stakeRewardsCtr', async function () {
			expect(await factoryCtr.masterContract()).to.equal(stakeRewardsCtr.address);
		});

		it('rewardsToken and stakingToken should match MockupToken Address', async function () {
			expect(await AliceTenant.rewardsToken()).to.equal(MockupToken.address);
			expect(await AliceTenant.stakingToken()).to.equal(MockupToken.address);
		});

		it('Reward Rate should be 100', async function () {
			expect(await AliceTenant.rewardRate()).to.equal(rewardRate);
		});

		it('Total Supply should be 0', async function () {
			expect(await AliceTenant.totalSupply()).to.equal(0);
		});
	});

	describe('Bob Staking', function () {
		beforeEach(async function () {
			await MockupToken.mock.transferFrom
				.withArgs(bob.address, AliceTenant.address, 100)
				.returns(true);
			await AliceTenant.connect(bob).stake(100);
		});
		it("Bob staking 100 should yield a total supply of 100 on Alice's Tenant Instance", async function () {
			expect(await AliceTenant.totalSupply()).to.equal(100);
			console.log(await AliceTenant._totalSupply());
			await advanceBlockTo(100);
			console.log(await AliceTenant.rewardPerToken());

		});

		it("Bob's balance should be 100", async function () {
			expect(await AliceTenant.balanceOf(bob.address)).to.equal(100);
		});
	});

	// it('Master Contract should match stakeRewardsCtr', async function () {
	//   expect(await factoryCtr.masterContract()).to.equal(stakeRewardsCtr.address);
	// });

	// it('Bob staking 100 should return a ', async function () {
	//   await MockupToken.mock.transferFrom.withArgs(bob.address, AliceTenant.address, 100).returns(true);
	//   await AliceTenant.connect(bob).stake(100);
	//   const x = await AliceTenant.totalSupply();
	//   console.log(x)
	// })
});
