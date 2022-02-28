const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0x05DF0a749F733779aa2FA5706C7552b094A7E8B0';
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