const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
  const Tribes = await hre.ethers.getContractFactory('Tribes');
  const tribes = await Tribes.deploy(hyperverseAdmin);
  await tribes.deployed();
  console.log(`Tribes deployed to: ${tribes.address}`);

  const TribesFactory = await hre.ethers.getContractFactory('TribesFactory');
  const tribesFactory = await TribesFactory.deploy(tribes.address, hyperverseAdmin);
  await tribesFactory.deployed();
  console.log('Tribes Factory deployed to: ', tribesFactory.address);


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