// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ExampleNFT = await ethers.getContractFactory("ExampleNFT");
  const exampleNFT = await ExampleNFT.deploy();
  await exampleNFT.deployed();
  console.log("ExampleNFT deployed to:", exampleNFT.address);

  const ExampleNFTFactory = await ethers.getContractFactory("ExampleNFTFactory");
  const exampleNFTFactory = await ExampleNFTFactory.deploy(exampleNFT.address);
  await exampleNFTFactory.deployed();
  console.log("ExampleNFTFactory deployed to:", exampleNFTFactory.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });