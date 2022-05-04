const hre = require('hardhat');
const fs = require('fs-extra');
const { constants } = require('ethers');
const main = async () => {
	const [deployer] = await ethers.getSigners();
	console.log('Deployer Address: ', deployer.address);
	const hyperverseAdmin = deployer.address;
	const BaseModule = await hre.ethers.getContractFactory('Module');
	const baseContract = await BaseModule.deploy(hyperverseAdmin);
	await baseContract.deployed();
	console.log('Module Contract deployed to: ', baseContract.address);
	const ModuleFactory = await hre.ethers.getContractFactory('ModuleFactory');
	const moduleFactory = await ModuleFactory.deploy(baseContract.address, hyperverseAdmin);
	await moduleFactory.deployed();

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = baseContract.address;
	env[hre.network.name].testnet.factoryAddress = moduleFactory.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });

	// Deploy default tenant
	let proxyAddress = constants.AddressZero;
	await moduleFactory.createInstance(deployer.address);
	while (proxyAddress === constants.AddressZero) {
		proxyAddress = await moduleFactory.getProxy(deployer.address);
	}
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();
