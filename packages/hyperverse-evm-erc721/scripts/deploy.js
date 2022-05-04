// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const fs = require('fs-extra');
const path = require('path');

require('dotenv').config();
async function main() {
	const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';

	const [deployer] = await ethers.getSigners();
	console.log('Deploying contracts with the account:', deployer.address);
	console.log('Account balance:', (await deployer.getBalance()).toString());
	// console.log(path.join(__dirname, "../../hyperverse-evm-erc721/artifacts/contracts/NFT.sol/NFT.json"));

	const NFT = await ethers.getContractFactory('ERC721');
	const nftContract = await NFT.deploy(hyperverseAdmin);
	await nftContract.deployed();

	const NFTFactory = await ethers.getContractFactory('ERC721Factory');
	const nftFactoryContract = await NFTFactory.deploy(nftContract.address, hyperverseAdmin);
	await nftFactoryContract.deployed();

	console.log(`[${hre.network.name}] NFT Contract deployed to: ${nftContract.address}`);
	console.log(
		`[${hre.network.name}] NFT Factory deployed to: ${nftFactoryContract.address}`
	);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = nftContract.address;
	env[hre.network.name].testnet.factoryAddress = nftFactoryContract.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	// .then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

module.exports = { main }