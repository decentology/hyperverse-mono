const { ethers } = require('hardhat');
const { expect } = require('chai');
const { constants } = require('ethers');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
// const { deploy } = require('@decentology/hyperverse-evm-erc721/scripts/deploy');



describe('Whitelist Test', function () {
	let Module;
	let ModuleFactory;
	let moduleContract;
	let factoryContract;
	let alice, bob, cara, joe;
	let timeInstance;
	let quantityInstance;
	let timeAndQuantityInstance;
	let merkleInstance;
	let tempHex = [ethers.utils.formatBytes32String(''), ethers.utils.formatBytes32String('')]


	let time = parseInt(((new Date().getTime() + 60 * 1000) / 1000).toFixed(0));
	let time2 = parseInt(((new Date().getTime() + 60 ** 3 * 1000) / 1000).toFixed(0));
	let time3 = parseInt(((new Date().getTime() + 60 ** 4 * 1000) / 1000).toFixed(0));
	let time4 = parseInt(((new Date().getTime() + 60 ** 6 * 1000) / 1000).toFixed(0));

	let whitelistedAddresses;

	// before(async  () => {
	// 	try {
			
	// 		await deploy();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// });

	beforeEach(async () => {
		Module = await ethers.getContractFactory('Whitelist');
		[owner, alice, bob, cara, joe] = await ethers.getSigners();

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

	describe('Default Whitelist', function () {
		describe('Time Based Whitelist', function () {
			before(async function () {
				await factoryContract
					.connect(alice)
					.createInstance(
						alice.address,
						time,
						time2,
						0,
						constants.AddressZero,
						constants.AddressZero
					);

				timeInstance = await Module.attach(await factoryContract.getProxy(alice.address));
			});

			describe('Initial', function () {
				it('Start Time and End Time', async function () {
					expect(await timeInstance.startTime()).to.equal(time);
					expect(await timeInstance.endTime()).to.equal(time2);
				});

				it('Time Based flag should be true', async function () {
					expect(await timeInstance.timeBased()).to.equal(true);
				});

				it('Quantity Based flag should be false', async function () {
					expect(await timeInstance.quantityBased()).to.equal(false);
				});

				it('Active flag should be false', async function () {
					expect(await timeInstance.active()).to.equal(false);
				});
			});

			describe('Getting Whitelisted', function () {
				beforeEach(async function () {
					const extraTime = 1 * 24 * 60 * 60;
					await ethers.provider.send('evm_increaseTime', [extraTime]);
				});

				it('Should allow Cara to whitelist', async function () {
					await timeInstance.connect(cara).getWhitelisted();
				});

				it('Should not allow Cara to whitelist twice', async function () {
					await expect(timeInstance.connect(cara).getWhitelisted()).to.be.revertedWith(
						'AlreadyInWhitelist()'
					);
				});

				it('Should not allow Cara to claim her whitelist', async function () {
					await expect(timeInstance.connect(cara).claimWhitelist(cara.address, tempHex)).to.be.revertedWith(
						'WhitelistIsNotActive()'
					);
				});

				it('Alice should be able to active claiming of whitelist', async function () {
					await timeInstance.connect(alice).activateWhitelistClaiming();
					expect(await timeInstance.active()).to.equal(true);
				});

				it('Should allow Cara to claim her whitelist', async function () {
					await timeInstance.connect(cara).claimWhitelist(cara.address,tempHex);
					expect(await timeInstance.addressesClaimed(cara.address)).to.equal(true);
				});

				it('Should now allow Cara to claim her again', async function () {
					await expect(timeInstance.connect(cara).claimWhitelist(cara.address, tempHex)).to.be.revertedWith(
						'AlreadyClaimedWhitelist()'
					);
				});
			});
		});

		describe('Quantity Based Whitelist', function () {
			before(async function () {
				await factoryContract
					.connect(alice)
					.createInstance(
						alice.address,
						0,
						0,
						2,
						constants.AddressZero,
						constants.AddressZero
					);

				quantityInstance = await Module.attach(
					await factoryContract.getProxy(alice.address)
				);
			});

			describe('Initial', function () {
				it('Units', async function () {
					expect(await quantityInstance.units()).to.equal(2);
				});

				it('Quantity Based flag should be true', async function () {
					expect(await quantityInstance.quantityBased()).to.equal(true);
				});

				it('Time Based flag should be false', async function () {
					expect(await quantityInstance.timeBased()).to.equal(false);
				});
			});

			describe('Getting Whitelisted', function () {
				it('Should allow Cara and Bob to whitelist', async function () {
					await quantityInstance.connect(cara).getWhitelisted();
					await quantityInstance.connect(bob).getWhitelisted();
				});

				it('Should not allow Joe to whitelist', async function () {
					await expect(quantityInstance.connect(joe).getWhitelisted()).to.be.revertedWith(
						'NoAvailableUnitsLeft()'
					);
				});
			});
		});

		describe('Time and Quantity Based Whitelist', function () {
			before(async function () {
				await factoryContract
					.connect(alice)
					.createInstance(
						alice.address,
						time3,
						time4,
						2,
						constants.AddressZero,
						constants.AddressZero
					);

				timeAndQuantityInstance = await Module.attach(
					await factoryContract.getProxy(alice.address)
				);
			});

			describe('Initial', function () {
				it('Start Time, End Time, Units', async function () {
					expect(await timeAndQuantityInstance.startTime()).to.equal(time3);
					expect(await timeAndQuantityInstance.endTime()).to.equal(time4);
					expect(await timeAndQuantityInstance.units()).to.equal(2);
				});

				it('Time Based and Quantity flag should be true', async function () {
					expect(await timeAndQuantityInstance.timeBased()).to.equal(true);
					expect(await timeAndQuantityInstance.quantityBased()).to.equal(true);
				});
			});

			describe('Getting Whitelisted', function () {
				beforeEach(async function () {
					const extraTime = 15 * 24 * 60 * 60 * 60;
					await ethers.provider.send('evm_increaseTime', [extraTime * 2]);
				});

				it('Should allow Cara and Bob to whitelist', async function () {
					await timeAndQuantityInstance.connect(cara).getWhitelisted();
					await timeAndQuantityInstance.connect(bob).getWhitelisted();
				});

				it('Should not allow Joe to whitelist', async function () {
					await expect(
						timeAndQuantityInstance.connect(joe).getWhitelisted()
					).to.be.revertedWith('NoAvailableUnitsLeft()');
				});
			});
		});

		describe('NFT Based Whitelist', function () {});
		describe('FT Based Whitelist', function () {});
		describe('NFT and FT Based Whitelist', function () {});

		describe('All Categories', function () {
			describe('NFT Based Whitelist', function () {});
			describe('FT Based Whitelist', function () {});
			describe('NFT and FT Based Whitelist', function () {});
		});

	});

	describe('Merkle Whitelist', function () {
		let hexProof
		before(async function () {
			whitelistedAddresses = [alice.address, bob.address, cara.address];
			const leafNodes = whitelistedAddresses.map(address => keccak256(address));
			const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
			const root = tree.getRoot();

			const cliamingAddr = leafNodes[0];
			 hexProof = tree.getHexProof(cliamingAddr);
		
			 merkleInstance = await Module.attach(await factoryContract.getProxy(alice.address));
			//  await merkleInstance.initM

		})

		it('Checking owner', async function () {
			console.log(hexProof)
			// expect(await moduleContract.contractOwner()).to.equal(owner.address);
		});
	})
});
