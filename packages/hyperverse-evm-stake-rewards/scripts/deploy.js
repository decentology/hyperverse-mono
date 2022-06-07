const hre = require('hardhat');
const fs = require('fs-extra');
const erc777Factory = require('../../hyperverse-evm-erc777/artifacts/contracts/ERC777Factory.sol/ERC777Factory.json');
const erc777 = require('../../hyperverse-evm-erc777/artifacts/contracts/ERC777.sol/ERC777.json');
require('dotenv').config();
const main = async () => {
	// Launches the ERC1820 needed for local development
	if (process.env.LOCALDEPLOY) {
		await hre.run('node:get-provider');
	}
	const [deployer, alice] = await ethers.getSigners();
	const hyperverseAdmin = deployer.address;
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
	let stakingAddress, rewardAddress;
	if (process.env.LOCALDEPLOY) {
		// Get bytecode from ERC777 contract

		const token777 = new hre.ethers.ContractFactory(erc777.abi, erc777.bytecode, deployer);
		const token = await token777.deploy(hyperverseAdmin);
		await token.deployed();
		const TokenFactory777 = await hre.ethers.getContractFactory(
			erc777Factory.abi,
			erc777Factory.bytecode,
			deployer
		);
		const tokenFactory777Instance = await TokenFactory777.deploy(
			token.address,
			hyperverseAdmin
		);
		await tokenFactory777Instance.deployed();

		// Setup Staking Token
		let instanceTnx = await tokenFactory777Instance.createInstance(
			deployer.address,
			'Staking Token',
			'STK',
			[],
			18
		);

		await instanceTnx.wait();
		const stakingAddress = await tokenFactory777Instance.getProxy(deployer.address);

		// Setup Rewards Token
		instanceTnx = await tokenFactory777Instance.createInstance(
			alice.address,
			'Rewards Token',
			'RWD',
			[],
			18
		);
		await instanceTnx.wait();
		const rewardAddress = await tokenFactory777Instance.getProxy(alice.address);
		await tokenFactory.createInstance(deployer.address, stakingAddress, rewardAddress, 5);
		const stakingRewardInstance = await tokenFactory.getProxy(deployer.address);
		console.log('Staking Token Contract deployed to: ', stakingAddress);
		console.log('Rewards Token Contract deployed to: ', rewardAddress);
		console.log('Staking Rewards Contract deployed to: ', stakingRewardInstance);
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
