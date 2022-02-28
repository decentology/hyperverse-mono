const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0x9809ABAfe657533F4Fd409a4DDf442B093A8AEAe';
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