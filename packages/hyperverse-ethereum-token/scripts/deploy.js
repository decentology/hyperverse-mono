const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D';
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy(hyperverseAdmin);
  await token.deployed();
  console.log(`Token deployed to: ${token.address}`);

  const TokenFactory = await hre.ethers.getContractFactory('TokenFactory');
  const tokenFactory = await TokenFactory.deploy(token.address, hyperverseAdmin);
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