const hre = require('hardhat');
const fs = require('fs-extra');
const { constants } = require('ethers');
const main = async () => {
	const [deployer] = await ethers.getSigners();
	console.log('Deployer Address: ', deployer.address);
	const hyperverseAdmin = deployer.address;
	const BaseModule = await hre.ethers.getContractFactory('SafuuX');
	const baseContract = await BaseModule.deploy("Safuu","Safuu","0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097");
	await baseContract.deployed();
	console.log('Module Contract deployed to: ', baseContract.address);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = baseContract.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });
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
