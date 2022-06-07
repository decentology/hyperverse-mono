const hre = require('hardhat');
const fs = require('fs-extra');
const { ethers } = require('hardhat');
require('dotenv').config();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const main = async () => {
	// Launches the ERC1820 needed for local development
	await hre.run('node:get-provider')
	const [deployer] = await ethers.getSigners();
	const hyperverseAdmin = deployer.address;

	const Token = await ethers.getContractFactory('ERC777');
	const token = await Token.deploy(hyperverseAdmin);
	await token.deployed();

	const TokenFactory = await ethers.getContractFactory('ERC777Factory');
	const tokenFactory = await TokenFactory.deploy(token.address, hyperverseAdmin);
	await tokenFactory.deployed();

	console.log(`[${hre.network.name}] Token deployed to: ${token.address}`);
	console.log(`[${hre.network.name}] Token Factory deployed to:  ${tokenFactory.address}`);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = token.address;
	env[hre.network.name].testnet.factoryAddress = tokenFactory.address;

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
