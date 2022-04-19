// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const fs = require('fs-extra');
require('dotenv').config();
async function main() {
	const [deployer] = await ethers.getSigners();
	console.log('Deploying contracts with the account:', deployer.address);
	console.log('Account balance:', (await deployer.getBalance()).toString());

	const MintPass = await ethers.getContractFactory('MintPass');
	const mintPassContract = await MintPass.deploy();
	await mintPassContract.deployed();

	const MintPassFactory = await ethers.getContractFactory('MintPassFactory');
	const mintPassFactoryContract = await MintPassFactory.deploy(mintPassContract.address);
	await mintPassFactoryContract.deployed();

	console.log(`[${hre.network.name}] MintPass Contract deployed to: ${mintPassContract.address}`);
	console.log(
		`[${hre.network.name}] MintPass Factory deployed to: ${mintPassFactoryContract.address}`
	);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = mintPassContract.address;
	env[hre.network.name].testnet.factoryAddress = mintPassFactoryContract.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
