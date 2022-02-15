const hre = require('hardhat');
const main = async () => {
  const Token = await hre.artifacts.getContractFactory('Token');
  const token = await Token.deploy();
  await token.deployed();
  console.log(`Token deployed to: ${token.address}`);

  const TokenFactory = await hre.ethers.getContractFactory('TokenFactory');
  const tokenFactory = await TokenFactory.deploy(token.address);
  await tokenFactory.deployed();
  console.log('Token Factory deployed to: ', tokenFactory.address);


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