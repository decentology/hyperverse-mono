const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
  const StakeRewards = await hre.ethers.getContractFactory('StakeRewardsToken');
  const stakeRewards = await StakeRewards.deploy(hyperverseAdmin);
  await stakeRewards.deployed();
  console.log(`Stake Rewards deployed to: ${stakeRewards.address}`);

  const Factory = await hre.ethers.getContractFactory('StakeRewardsFactory');
  const factory = await Factory.deploy(stakeRewards.address, hyperverseAdmin);
  await factory.deployed();
  console.log('Factory deployed to: ', factory.address);


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