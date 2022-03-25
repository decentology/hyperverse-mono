const hre = require('hardhat');
const main = async () => {
  const contractFactor = await hre.ethers.getContractFactory('Module');
  const baseContract = await contractFactor.deploy();
  await baseContract.deployed();
  console.log('Module Contract deployed to: ', baseContract.address);
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
