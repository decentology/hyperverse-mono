const hre = require('hardhat');
const fs = require('fs-extra');

const main = async () => {
	const [deployer] = await ethers.getSigners();
	console.log('Deployer Address: ', deployer.address);
	const hyperverseAdmin = deployer.address;
	const Whitelist = await hre.ethers.getContractFactory('Whitelist');
	const whitelist = await Whitelist.deploy(hyperverseAdmin);
	await whitelist.deployed();

	const WhitelistFactory = await hre.ethers.getContractFactory('WhitelistFactory');
	const whitelistFactory = await WhitelistFactory.deploy(whitelist.address, hyperverseAdmin);
	await whitelistFactory.deployed();

	console.log(`[${hre.network.name}] Whitelist deployed to: ${whitelist.address}`);
	console.log(`[${hre.network.name}] Whitelist Factory deployed to: ${whitelistFactory.address}`);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = whitelist.address;
	env[hre.network.name].testnet.factoryAddress = whitelistFactory.address;

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