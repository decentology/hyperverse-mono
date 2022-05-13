const hre = require('hardhat');
const fs = require('fs-extra');
const { constants } = require('ethers');

const main = async () => {
	const [deployer] = await ethers.getSigners();
	console.log('Deployer Address: ', deployer.address);
	const hyperverseAdmin = deployer.address;
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

	// Setup Default Tenant
	let proxyAddress = constants.AddressZero;
	// await tribesFactory.createInstance(deployer.address);
	// while (proxyAddress === constants.AddressZero) {
	// 	proxyAddress = await tribesFactory.getProxy(deployer.address);
	// }
	// const tribesProxy = await Tribes.attach(proxyAddress);
	// console.log('Proxy Contract', tribesProxy.address);
	// await tribesProxy.addNewTribe('AABfrc40kgAcsJtNBxhR9nXBwRJGEek56bcigT5VofglIg');
	// await tribesProxy.addNewTribe('AAAKk52tJJCHPVlTTn-pHLBNaj0gfel64u0CTbqm95uuvA');
	// await tribesProxy.addNewTribe('AACGqB25a8vWbskwRO8YIoyvSoXR9poTz7DVEcl1RKdGbw');
	// await tribesProxy.addNewTribe('AABfNxBgYBQlGM2FAxiaguJM4dcS3bFJAtXGFE2LAc98yA');
	// await tribesProxy.addNewTribe('AABsBeuaExyLT-3ujU6pL-_o9l5oQYeaq24zvMAU7aiYSQ');
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
