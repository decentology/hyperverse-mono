const hre = require('hardhat');
const fs = require('fs-extra');

const main = async () => {
	const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
	const Tribes = await hre.ethers.getContractFactory('Tribes');
	const tribes = await Tribes.deploy(hyperverseAdmin);
	await tribes.deployed();

	const TribesFactory = await hre.ethers.getContractFactory('TribesFactory');
	const tribesFactory = await TribesFactory.deploy(tribes.address, hyperverseAdmin);
	await tribesFactory.deployed();

	console.log(`[${hre.network.name}] Tribes deployed to: ${tribes.address}`);
	console.log(`[${hre.network.name}] Tribes Factory deployed to: ${tribesFactory.address}`);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = tribes.address;
	env[hre.network.name].testnet.factoryAddress = tribesFactory.address;

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
