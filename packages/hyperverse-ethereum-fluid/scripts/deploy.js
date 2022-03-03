// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
async function main() {
	console.log('process.env', process.env.RINKEBY_RPC_URL);
	const [deployer] = await ethers.getSigners();
	console.log('Deploying contracts with the account:', deployer.address);
	console.log('Account balance:', (await deployer.getBalance()).toString());

	const FluidNFT = await ethers.getContractFactory('FluidNFT');
	const fluidNFT = await FluidNFT.deploy();
	await fluidNFT.deployed();
	console.log('FluidNFT deployed to:', fluidNFT.address);

	const FluidNFTFactory = await ethers.getContractFactory('FluidNFTFactory');
	const fluidNFTFactory = await FluidNFTFactory.deploy(fluidNFT.address);
	await fluidNFTFactory.deployed();
	console.log('FluidNFTFactory deployed to:', fluidNFTFactory.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
