const { ethers } = require('hardhat');
const { expect } = require('chai');
const crypto = require('crypto');

describe('Module', async () => {
	let Tribes;
	let tribesContract;
	let alice;

	beforeEach(async () => {
		Tribes = await ethers.getContractFactory('Module');
		[alice, bob, cara] = await ethers.getSigners();

		tribesContract = await Tribes.deploy();
		await tribesContract.deployed();
	});

	describe('Initial', async () => {
		it('Checking owner', async () => {
			expect(await tribesContract.owner()).to.equal(alice.address);
		});
	});
});
