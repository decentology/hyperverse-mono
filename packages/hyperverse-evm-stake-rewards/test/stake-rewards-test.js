const { expect } = require('chai');
const { ethers,  } = require('hardhat');
const { advanceBlockTo, toBN } = require('./helpers');
const { BigNumber } = require('ethers');
let unitMultiple = new BigNumber.from(10).pow(new BigNumber.from(18));
let initialSupply = new BigNumber.from(1000000).mul(unitMultiple);

describe('StakeRewards Testing', function () {
	//ERC777 Contracts
	let ERC777;
	let erc777ctr;
	let TokenFactory;
	let tokenFactoryCtr;
	let rewardTokenAlice;
	let stakeTokenBob;

	//Staking Contracts
	let StakeRewards;
	let stakeRewardsCtr;
	let Factory;
	let stakeFactoryCtr;
	let AliceStakeTenant;

	// Signers
	let owner;
	let alice;
	let bob;
	
	const rewardRate = 10;

	beforeEach(async function () {
		//Creates the ERC777 StakeToken and RewardToken
		ERC777 = await ethers.getContractFactory('ERC777');
		[owner, alice, bob] = await ethers.getSigners();

		erc777ctr = await ERC777.deploy(owner.address);
		await erc777ctr.deployed();

		TokenFactory = await ethers.getContractFactory('ERC777Factory');
		tokenFactoryCtr = await TokenFactory.deploy(erc777ctr.address, owner.address);
		await tokenFactoryCtr.deployed();

		await tokenFactoryCtr
			.connect(alice)
			.createInstance('ALICE', 'ALC', [], initialSupply, alice.address);

		await tokenFactoryCtr
			.connect(bob)
			.createInstance('BOB', 'BO', [], initialSupply, bob.address);

		rewardTokenAlice = await ERC777.attach(await tokenFactoryCtr.getProxy(alice.address));
		stakeTokenBob = await ERC777.attach(await tokenFactoryCtr.getProxy(bob.address));

		StakeRewards = await ethers.getContractFactory('StakeRewardsToken');
		stakeRewardsCtr = await StakeRewards.deploy(owner.address);
		await stakeRewardsCtr.deployed();

		Factory = await ethers.getContractFactory('StakeRewardsFactory');
		stakeFactoryCtr = await Factory.deploy(stakeRewardsCtr.address, owner.address);
		await stakeFactoryCtr.deployed();

		await stakeFactoryCtr
			.connect(alice)
			.createInstance(alice.address, stakeTokenBob.address, rewardTokenAlice.address, rewardRate);

		AliceStakeTenant = await StakeRewards.attach(await stakeFactoryCtr.getProxy(alice.address));

		//TENANT OWNER: add the StakeRewardsToken instance to the Reward Token ERC777 default operactor
		await rewardTokenAlice.connect(alice).authorizeOperator(AliceStakeTenant.address);

	});

	describe('Initial State Variables', function () {
		it('Master Contract should match stakeRewardsCtr', async function () {
			expect(await stakeFactoryCtr.masterContract()).to.equal(stakeRewardsCtr.address);

		});

		it('rewardsToken and stakingToken should match MockStakingToken and MockRewardsToken Address', async function () {
			expect(await AliceStakeTenant.rewardsToken()).to.equal(rewardTokenAlice.address);
			expect(await AliceStakeTenant.stakingToken()).to.equal(stakeTokenBob.address);
		});

		it('Reward Rate should be 100', async function () {
			expect(await AliceStakeTenant.rewardRate()).to.equal(rewardRate);
		});

		it('Total Supply should be 0', async function () {
			expect(await AliceStakeTenant.totalSupply()).to.equal(0);
		});
	});

	describe('Stake, Withdraw, and Collect Rewards', function () {
		beforeEach(async function () {

			//user step: allow the stake instance to be a default operator
			await stakeTokenBob.connect(bob).authorizeOperator(AliceStakeTenant.address);

			await AliceStakeTenant.connect(bob).stake(100);
			// await AliceStakeTenant.connect(bob).stake(100);
			await advanceBlockTo((await ethers.provider.getBlockNumber()) + 1);
		});

		describe('Staking', function () {
			it("Staking 100 should yield a total supply of 100 on Alice's Tenant Instance", async function () {
				expect(await AliceStakeTenant.totalSupply()).to.equal(100);
			});
		

				it("Bob's balance should be 100", async function () {
					expect(await AliceStakeTenant.balanceOf(bob.address)).to.equal(100);
				});

				it("RewardToken should yield an amount based on Bob's stake and an advance to the block time", async function () {
					const rewardPerTokenStored = await AliceStakeTenant.rewardPerTokenStored();
					const blockBefore = await ethers.provider.getBlock(
						await ethers.provider.getBlockNumber()
					);
					const lastUpdatedTime = await AliceStakeTenant.lastUpdatedTime();
					const totalSupply = await AliceStakeTenant.totalSupply();

					const expectedRewardPerToken = toBN(
						rewardPerTokenStored +
							((blockBefore.timestamp - lastUpdatedTime) * rewardRate * 1e18) /
								totalSupply
					);

					expect(await AliceStakeTenant.rewardPerToken()).to.equal(expectedRewardPerToken);
				});

				it('Should return the right amount of rewards for Bob based on his stake and how long its been staked', async function () {
					const balance = await AliceStakeTenant.balanceOf(bob.address);
					const rewardPerToken = await AliceStakeTenant.rewardPerToken();
					const userRewardPaid = await AliceStakeTenant.userRewardPerTokenPaid(bob.address);
					const userReward = await AliceStakeTenant.rewards(bob.address);

					const expectedEarned =
						parseInt((balance * (rewardPerToken - userRewardPaid)) / 1e18) +
						parseInt(userReward);

					expect(await AliceStakeTenant.earned(bob.address)).to.equal(expectedEarned);
				});
			});

		describe('Withdrawing', function () {
				beforeEach(async function () {
					await AliceStakeTenant.connect(bob).withdraw(50);
				});

				it("Bob's ERC20 balance should be 50", async function () {
					expect(await stakeTokenBob.balanceOf(bob.address)).to.equal(initialSupply.sub(50));
				});

				it("Total Supply of Alice's Instance should decrease ", async function () {
					expect(await AliceStakeTenant.totalSupply()).to.equal(50);
				});

				it("Should update Bob's recorded balance in Alice's Instance", async function () {
					expect(await AliceStakeTenant.balanceOf(bob.address)).to.equal(50);
				});
		});

		describe('Collect Rewards', function () {
			beforeEach(async function () {
				await AliceStakeTenant.connect(bob).claimReward();
			});

			it('Should be able to transfer rewards to Bob', async function () {
				expect(await rewardTokenAlice.balanceOf(bob.address)).to.equal(20);
			});

			it("Should update Bob's reward in Alice's Instance to 0", async function () {
				expect(await AliceStakeTenant.rewards(bob.address)).to.equal(0);
			});
		});
	});
});
