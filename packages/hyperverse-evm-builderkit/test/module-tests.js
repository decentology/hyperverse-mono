const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Module', function () {
	let Module;
	let ModuleFactory;
	let moduleContract;
	let factoryContract;
	let alice;
	

	beforeEach(async () => {
		Module = await ethers.getContractFactory('Module');
		[owner, alice, bob, cara] = await ethers.getSigners();

		moduleContract = await Module.deploy(owner.address);
		await moduleContract.deployed();

		ModuleFactory  = await ethers.getContractFactory('ModuleFactory');
		factoryContract = await ModuleFactory.deploy(moduleContract.address, owner.address);
	});

	describe('Initial', function ()  {
		it('Checking owner', async () => {
			expect(await moduleContract.contractOwner()).to.equal(owner.address);
		});
	});
});
