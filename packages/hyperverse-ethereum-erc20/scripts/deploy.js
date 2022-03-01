const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
  const Token = await hre.ethers.getContractFactory('ERC20');
  const token = await Token.deploy(hyperverseAdmin);
  await token.deployed();
  console.log(`Token deployed to: ${token.address}`);

  const TokenFactory = await hre.ethers.getContractFactory('ERC20Factory');
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