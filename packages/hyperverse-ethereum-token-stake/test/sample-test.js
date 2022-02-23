const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMockContract } = require("@ethereum-waffle/mock-contract");
const tokenAbi  = require("./utils/tokenAbi.json");

describe("StakeRewards", function () {

  //Staking Contracts
  let StakeRewards;
  let stakeRewardsCtr;
  let Factory;
  let factoryCtr;

  //Mockup Token Contracts for Setup
  let MockupToken;

  let AliceTenant;
  //Test Accounts
  let owner;
  let alice;
  let bob;
  let cara;

  beforeEach(async function () {
    StakeRewards = await ethers.getContractFactory("StakeRewardsToken");
    [owner, alice, bob, cara] = await ethers.getSigners();
    stakeRewardsCtr = await StakeRewards.deploy(owner.address);
    await stakeRewardsCtr.deployed();
    
    Factory = await ethers.getContractFactory("StakeRewardsFactory");
    factoryCtr = await Factory.deploy(stakeRewardsCtr.address, owner.address);
    await factoryCtr.deployed();

    MockupToken = await deployMockContract(owner,tokenAbi.abi);

    await factoryCtr.connect(alice).createInstance(alice.address, MockupToken.address, MockupToken.address, 100)

    const stakeMainCtr = await ethers.getContractFactory("StakeRewardsToken");
    AliceTenant = await stakeMainCtr.attach(await factoryCtr.getProxy(alice.address));
    console.log(alice.address, AliceTenant.address)
  })

  it('Master Contract should match stakeRewardsCtr', async function () {
    expect(await factoryCtr.masterContract()).to.equal(stakeRewardsCtr.address);
  });

  it('Staking', async function () {
    await MockupToken.mock.transferFrom(bob.address, AliceTenant.address, 100).returns(true);
    await AliceTenant.connect(bob).stake(100);
  })


})

