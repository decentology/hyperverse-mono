const hre = require('hardhat');
const fs = require('fs-extra');
const { constants } = require('ethers');
const TribesFactory = require('../artifacts/contracts/TribesFactory.sol/TribesFactory.json')
const Tribes = require('../artifacts/contracts/Tribes.sol/Tribes.json')

const main = async () => {
	Contracts.

	const [deployer] = await ethers.getSigners();

  const tribesFactory = new ethers.Contract('0xAd41a8957f31F115771E36ab80e83a28B7548fc5', TribesFactory.abi, deployer);
	// Setup Default Tenant
	let proxyAddress = constants.AddressZero;

	let txn = await tribesFactory.createInstance(deployer.address);
	txn.wait();

	proxyAddress = await tribesFactory.getProxy(deployer.address);
	console.log(proxyAddress);

	const tribesProxy = new ethers.Contract(proxyAddress, Tribes.abi, deployer);

	console.log('Proxy Contract', tribesProxy.address);
	await tribesProxy.addNewTribe('AABfrc40kgAcsJtNBxhR9nXBwRJGEek56bcigT5VofglIg');
	await tribesProxy.addNewTribe('AAAKk52tJJCHPVlTTn-pHLBNaj0gfel64u0CTbqm95uuvA');
	await tribesProxy.addNewTribe('AACGqB25a8vWbskwRO8YIoyvSoXR9poTz7DVEcl1RKdGbw');
	await tribesProxy.addNewTribe('AABfNxBgYBQlGM2FAxiaguJM4dcS3bFJAtXGFE2LAc98yA');
	await tribesProxy.addNewTribe('AABsBeuaExyLT-3ujU6pL-_o9l5oQYeaq24zvMAU7aiYSQ');
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
