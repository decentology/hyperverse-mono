const { ethers, solidity } = require('hardhat');
const { expect } = require('chai');
const { advanceBlockTo, toBN } = require('./helpers');
const chai = require('chai');

describe('Whitelist Test', function () {
	let Module;
	let ModuleFactory;
	let moduleContract;
	let factoryContract;
	let alice;
	let bob;
	let cara;
	let aliceInstance;
	let bobInstance;
	let caraInstance;

	let time = parseInt(((new Date().getTime() + 60 * 1000) / 1000).toFixed(0));
	let time2 = parseInt(((new Date().getTime() + 60 * 60 * 60 * 1000) / 1000).toFixed(0));

	beforeEach(async () => {
		Module = await ethers.getContractFactory('Whitelist');
		[owner, alice, bob, cara] = await ethers.getSigners();

		moduleContract = await Module.deploy(owner.address);
		await moduleContract.deployed();

		ModuleFactory = await ethers.getContractFactory('WhitelistFactory');
		factoryContract = await ModuleFactory.deploy(moduleContract.address, owner.address);
	});

	describe('Initial', function () {
		it('Checking owner', async function () {
			expect(await moduleContract.contractOwner()).to.equal(owner.address);
		});
	});

	describe('Time, Quantity, or Both', function () {
		describe('Time Based Whitelist', function () {
			before(async function () {
				await factoryContract.connect(alice).createInstance(alice.address, time, time2, 0);

				aliceInstance = await Module.attach(await factoryContract.getProxy(alice.address));
			});

			describe('Initial', function () {
				it('Start Time and End Time', async function () {
					expect(await aliceInstance.startTime()).to.equal(time);
					expect(await aliceInstance.endTime()).to.equal(time2);
				});

				it('Time Based flag should be true', async function () {
					expect(await aliceInstance.timeBased()).to.equal(true);
				})

				it('Quantity Based flag should be false', async function () {
					expect(await aliceInstance.quantityBased()).to.equal(false);
				})

				it('Active flag should be false', async function () {
					expect(await aliceInstance.active()).to.equal(false);
				})
			})

			describe('Getting Whitelisted', function () {
				beforeEach(async function () {

					const sevenDays = 1 * 24 * 60 * 60;
					await ethers.provider.send('evm_increaseTime', [sevenDays]);
				
				})

				it('Should allow Cara to whitelist', async function () {
					await aliceInstance.connect(cara).getWhitelisted()
				})

				it('Should not allow Cara to whitelist twice', async function () {
					await expect(aliceInstance.connect(cara).getWhitelisted()).to.be.revertedWith('AlreadyInWhitelist()');
				})

				it('Should not allow Cara to claim her whitelist', async function () {
					await expect(aliceInstance.connect(cara).claimWhitelist()).to.be.revertedWith('WhitelistIsNotActive()');
				})

				it('Alice should be able to active claiming of whitelist', async function () {
					await aliceInstance.connect(alice).activateWhitelistClaiming();
					expect(await aliceInstance.active()).to.equal(true);
				})

				it('Should allow Cara to claim her whitelist', async function () {
					await aliceInstance.connect(cara).claimWhitelist()
					expect (await aliceInstance.addressesClaimed(cara.address)).to.equal(true);
				})

				it('Should now allow Cara to claim her again', async function () {
					await expect(aliceInstance.connect(cara).claimWhitelist()).to.be.revertedWith('AlreadyClaimedWhitelist()');
				})

			})
		});
	});
});
