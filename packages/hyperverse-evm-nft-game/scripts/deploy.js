// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const fs = require('fs-extra');
const path = require('path');
const { constants } = require('ethers');

require('dotenv').config();
async function main() {
	const [deployer] = await ethers.getSigners();
	const hyperverseAdmin = deployer.address;
	console.log('Deploying contracts with the account:', deployer.address);
	console.log('Account balance:', (await deployer.getBalance()).toString());

	const NFT = await ethers.getContractFactory('NFTGame1');
	const nftContract = await NFT.deploy(hyperverseAdmin);
	await nftContract.deployed();

	const NFTFactory = await ethers.getContractFactory('NFTGame1Factory');
	const nftFactoryContract = await NFTFactory.deploy(nftContract.address, hyperverseAdmin);
	await nftFactoryContract.deployed();

	console.log(`[${hre.network.name}] NFT Contract deployed to: ${nftContract.address}`);
	console.log(`[${hre.network.name}] NFT Factory deployed to: ${nftFactoryContract.address}`);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = nftContract.address;
	env[hre.network.name].testnet.factoryAddress = nftFactoryContract.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });
	if (process.env.LOCALDEPLOY) {
		let proxyAddress = constants.AddressZero;
		const instanceTnx = await nftFactoryContract.createInstance(
			deployer.address,
			'Test',
			'TST'
		);
		instanceTnx.wait();
		console.log('Instance Created', instanceTnx.hash);
		while (proxyAddress === constants.AddressZero) {
			try {
				proxyAddress = await nftFactoryContract.getProxy(deployer.address);
			} catch (error) {
				proxyAddress = constants.AddressZero;
			}
		}
	}
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	// .then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

module.exports = { main };
