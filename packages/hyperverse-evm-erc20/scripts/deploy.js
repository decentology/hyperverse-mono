const hre = require('hardhat');
const fs = require('fs-extra');
const main = async () => {
	const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
	const Token = await hre.ethers.getContractFactory('ERC20');
	const token = await Token.deploy(hyperverseAdmin);
	await token.deployed();

	const TokenFactory = await hre.ethers.getContractFactory('ERC20Factory');
	const tokenFactory = await TokenFactory.deploy(token.address, hyperverseAdmin);
	await tokenFactory.deployed();

	console.log(`[${hre.network.name}] Token deployed to: ${token.address}`);
	console.log(`[${hre.network.name}] Token Factory deployed to:  ${tokenFactory.address}`);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	let networkName = hre.network.name;
	let isMainnet = false;
	if (networkName.includes('mainnet')) {
		isMainnet = true;
		networkName = networkName.split('-')[0];
	}
	env[networkName] = env[networkName] || {};
	env[networkName].testnet = env[networkName].testnet || {};
	env[networkName].mainnet = env[networkName].mainnet || {};

	env[networkName][isMainnet ? 'mainnet' : 'testnet'].contractAddress = token.address;
	env[networkName][isMainnet ? 'mainnet' : 'testnet'].factoryAddress = tokenFactory.address;

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
