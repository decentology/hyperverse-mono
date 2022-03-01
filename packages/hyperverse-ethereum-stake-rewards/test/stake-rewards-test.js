const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');
const { advanceBlockTo, toBN} = require('./helpers')


describe('StakeRewards Testing', function () {
	//Staking Contracts
	let StakeRewards;
	let stakeRewardsCtr;
	let Factory;
	let factoryCtr;

	//Mockup Token Contracts for Setup
	let MockStakingToken;
	let MockRewardsToken;

	let AliceTenant;
	//Test Accounts
	let owner;
	let alice;
	let bob;
	let cara;

	const rewardRate = 10;

	beforeEach(async function () {
		StakeRewards = await ethers.getContractFactory('StakeRewardsToken');
		[owner, alice, bob, cara] = await ethers.getSigners();
		stakeRewardsCtr = await StakeRewards.deploy(owner.address);
		await stakeRewardsCtr.deployed();

		Factory = await ethers.getContractFactory('StakeRewardsFactory');
		factoryCtr = await Factory.deploy(stakeRewardsCtr.address, owner.address);
		await factoryCtr.deployed();

		MockStakingToken = await deployMockContract(owner, tokenAbi.abi);
		MockRewardsToken = await deployMockContract(owner, tokenAbi.abi);

		await factoryCtr
			.connect(alice)
			.createInstance(alice.address, MockStakingToken.address, MockRewardsToken.address, rewardRate);

		const stakeMainCtr = await ethers.getContractFactory('StakeRewardsToken');
		AliceTenant = await stakeMainCtr.attach(await factoryCtr.getProxy(alice.address));
	});

	describe('Initial State Variables', function () {
		it('Master Contract should match stakeRewardsCtr', async function () {
			expect(await factoryCtr.masterContract()).to.equal(stakeRewardsCtr.address);
		});

		it('rewardsToken and stakingToken should match MockStakingToken and MockRewardsToken Address', async function () {
			expect(await AliceTenant.rewardsToken()).to.equal(MockRewardsToken.address);
			expect(await AliceTenant.stakingToken()).to.equal(MockStakingToken.address);
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
			await MockStakingToken.mock.transferFrom
				.withArgs(bob.address, AliceTenant.address, 100)
				.returns(true);
			await AliceTenant.connect(bob).stake(100);
			await advanceBlockTo(await ethers.provider.getBlockNumber() + 1);
		});
		it("Bob staking 100 should yield a total supply of 100 on Alice's Tenant Instance", async function () {
			expect(await AliceTenant.totalSupply()).to.equal(100);

		});

		it("Bob's balance should be 100", async function () {
			expect(await AliceTenant.balanceOf(bob.address)).to.equal(100);
		});


		it("RewardToken should yield an amount based on Bob's stake and an advance to the block time", async function () {
			const rewardPerTokenStored = await AliceTenant.rewardPerTokenStored();
			const blockBefore = await ethers.provider.getBlock(await ethers.provider.getBlockNumber());
			const lastUpdatedTime= await AliceTenant.lastUpdatedTime();
			const totalSupply = await AliceTenant.totalSupply();
	
			const expectedRewardPerToken = toBN(rewardPerTokenStored + (((blockBefore.timestamp - lastUpdatedTime) * rewardRate * 1e18) / totalSupply));

	    expect(await AliceTenant.rewardPerToken()).to.equal(expectedRewardPerToken);
		})

		it("Should return the right amount of rewards for Bob based on his stake and how long its been staked", async function () {
			const balance = await AliceTenant.balanceOf(bob.address);
			const rewardPerToken = await AliceTenant.rewardPerToken();
			const userRewardPaid = await AliceTenant.userRewardPerTokenPaid(bob.address);
			const userReward = await AliceTenant.rewards(bob.address);
			
			const expectedEarned = parseInt(((balance * (rewardPerToken - userRewardPaid)) / 1e18) ) + parseInt(userReward);

			expect(await AliceTenant.earned(bob.address)).to.equal(expectedEarned);

		})

	});

	describe('Bob Withdrawing 50', function () {
		beforeEach(async function () {
			await MockStakingToken.mock.transferFrom
				.withArgs(bob.address, AliceTenant.address, 100)
				.returns(true);
			await AliceTenant.connect(bob).stake(100);
			await advanceBlockTo(await ethers.provider.getBlockNumber() + 1);

			await MockStakingToken.mock.transfer
			.withArgs(bob.address, 50)
			.returns(true);

			await MockStakingToken.mock.balanceOf
			.withArgs(bob.address).returns(50);

			await AliceTenant.connect(bob).withdraw(50);
		});

		it("Bob's ERC20 balance should be 50", async function () {
			expect(await MockStakingToken.balanceOf(bob.address)).to.equal(50);
		})

		it("Total Supply of Alice's Instance should decrease ", async function () {

			expect(await AliceTenant.totalSupply()).to.equal(50);
		})

		it("Should update Bob's recorded balance in Alice's Instance", async function () {
			expect(await AliceTenant.balanceOf(bob.address)).to.equal(50);
		})
	
	})

	describe('Bob Collecting Rewards', function () {
		beforeEach(async function () {
			await MockStakingToken.mock.transferFrom
				.withArgs(bob.address, AliceTenant.address, 100)
				.returns(true);
			await AliceTenant.connect(bob).stake(100);
			await advanceBlockTo(await ethers.provider.getBlockNumber() + 1);


			await MockRewardsToken.mock.transfer
			.withArgs(bob.address, 40)
			.returns(true);

			await MockRewardsToken.mock.balanceOf
			.withArgs(bob.address).returns(40);


		  await AliceTenant.connect(bob).getReward();
		});

		it("Should be able to transfer rewards to Bob", async function () {
			expect(await MockRewardsToken.balanceOf(bob.address)).to.equal(40);
		})

		it("Should update Bob's reward in Alice's Instance to 0", async function () {
			expect(await AliceTenant.rewards(bob.address)).to.equal(0);
		})

	})
});
