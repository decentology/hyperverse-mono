const hre = require('hardhat');
const fs = require('fs-extra');
const main = async () => {
	const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
	const Token = await hre.ethers.getContractFactory('StakeRewardsToken');
	const token = await Token.deploy(hyperverseAdmin);
	await token.deployed();

	const TokenFactory = await hre.ethers.getContractFactory('StakeRewardsFactory');
	const tokenFactory = await TokenFactory.deploy(token.address, hyperverseAdmin);
	await tokenFactory.deployed();

	console.log(`[${hre.network.name}] Master Contract deployed to: ${token.address}`);
	console.log(`[${hre.network.name}] Factory Contract deployed to:  ${tokenFactory.address}`);

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
