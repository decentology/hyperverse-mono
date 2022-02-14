const hre = require('hardhat');
const main = async () => {
  const tribesContractFactory = await hre.ethers.getContractFactory('Tribes');
  const baseTribesContract = await tribesContractFactory.deploy();
  await baseTribesContract.deployed();
  console.log('Tribes Contract deployed to: ', baseTribesContract.address);
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