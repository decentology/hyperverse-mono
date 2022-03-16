// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const fs = require('fs-extra');
require('dotenv').config();
async function main() {
	let vrfCoordinator, linkToken, keyHash;
	switch (hre.network.name) {
		case 'ethereum':
			vrfCoordinator = '0x6168499c0cFfCaCD319c818142124B7A15E857ab';
			linkToken = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
			keyHash = '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc';
			break;
		case 'polygon':
			vrfCoordinator = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255';
			linkToken = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
			keyHash = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4';
			break;
		default:
			throw new Error('Unsupported network');
	}

	const RandomPick = await ethers.getContractFactory('RandomPick');
	const randomPick = await RandomPick.deploy(vrfCoordinator, linkToken, keyHash);
	await randomPick.deployed();
	console.log(JSON.stringify(randomPick));
	console.log(
		`[${hre.network.name}] RandomPick deployed to: ${randomPick.address} from transaction ${randomPick.transactionHash}`
	);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = randomPick.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
