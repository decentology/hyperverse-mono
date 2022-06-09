const hre = require('hardhat');
const fs = require('fs-extra');
const erc777Factory = require('../../hyperverse-evm-erc777/artifacts/contracts/ERC777Factory.sol/ERC777Factory.json');
const erc777 = require('../../hyperverse-evm-erc777/artifacts/contracts/ERC777.sol/ERC777.json');
const { BigNumber } = require('ethers');
let unitMultiple = new BigNumber.from(10).pow(new BigNumber.from(18));
let initialSupply = new BigNumber.from(1000000).mul(unitMultiple);
require('dotenv').config();
const main = async () => {
	// Launches the ERC1820 needed for local development
	if (process.env.LOCALDEPLOY) {
		await hre.run('node:get-provider');
	}
	const [deployer, alice] = await ethers.getSigners();
	const hyperverseAdmin = deployer.address;
	const StakeRewardsTokenDeployer = await hre.ethers.getContractFactory('StakeRewardsToken');
	const token = await StakeRewardsTokenDeployer.deploy(hyperverseAdmin);
	await token.deployed();

	const StakeRewardsFactoryDeployer = await hre.ethers.getContractFactory('StakeRewardsFactory');
	const tokenFactory = await StakeRewardsFactoryDeployer.deploy(token.address, hyperverseAdmin);
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

		const Token777Deployer = new hre.ethers.ContractFactory(
			erc777.abi,
			erc777.bytecode,
			deployer
		);
		const token777Instance = await Token777Deployer.deploy(hyperverseAdmin);
		await token777Instance.deployed();
		const Token777FactoryDeployer = await hre.ethers.getContractFactory(
			erc777Factory.abi,
			erc777Factory.bytecode,
			deployer
		);
		const tokenFactory777Instance = await Token777FactoryDeployer.deploy(
			token777Instance.address,
			hyperverseAdmin
		);
		await tokenFactory777Instance.deployed();

		// Setup Staking Token
		let instanceTnx = await tokenFactory777Instance.createInstance(
			deployer.address,
			'Staking Token',
			'STK',
			[],
			initialSupply
		);

		await instanceTnx.wait();
		const stakingAddress = await tokenFactory777Instance.getProxy(deployer.address);

		// Setup Rewards Token
		instanceTnx = await tokenFactory777Instance.createInstance(
			alice.address,
			'Rewards Token',
			'RWD',
			[],
			initialSupply
		);
		await instanceTnx.wait();
		const rewardAddress = await tokenFactory777Instance.getProxy(alice.address);
		await tokenFactory.createInstance(deployer.address, stakingAddress, rewardAddress, 5);
		const stakingRewardInstance = await tokenFactory.getProxy(deployer.address);
		console.log('Staking Token Contract deployed to: ', stakingAddress);
		console.log('Rewards Token Contract deployed to: ', rewardAddress);
		console.log('Staking Rewards Contract deployed to: ', stakingRewardInstance);

		const stakingToken777Proxy = await Token777Deployer.attach(stakingAddress);
		await stakingToken777Proxy.authorizeOperator(stakingRewardInstance);
		await (await Token777Deployer.attach(rewardAddress)).authorizeOperator(stakingRewardInstance);
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
