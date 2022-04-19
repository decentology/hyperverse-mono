const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('MintPass', function () {
  let MintPass;
  let mintPassContract;
  let MintPassFactory;
  let mintPassFactoryContract;
  let alice;
  let bob;
  let cara;
  let aliceProxyContract;

  beforeEach(async () => {
    [alice, bob, cara] = await ethers.getSigners();

    MintPass = await ethers.getContractFactory('MintPass');
    mintPassContract = await MintPass.deploy();
    await mintPassContract.deployed();

    MintPassFactory = await ethers.getContractFactory('MintPassFactory');
    mintPassFactoryContract = await MintPassFactory.deploy(mintPassContract.address);
    await mintPassFactoryContract.deployed();

    await mintPassFactoryContract.connect(alice).createInstance("ALICE", "ALC");
    aliceProxyContract = await MintPass.attach(await mintPassFactoryContract.getProxy(alice.address));
  });

  it('Master Contract should match mintPassContract', async function () {
    expect(await mintPassFactoryContract.masterContract()).to.equal(mintPassContract.address);
  });

  it("Should match alice's initial token data", async function () {
    expect(await aliceProxyContract.name()).to.equal('ALICE');
    expect(await aliceProxyContract.symbol()).to.equal('ALC');
  });

  it("Should reflect the correct balances", async function () {
    await aliceProxyContract.connect(alice).mint(alice.address, 1, 500);
    expect(await aliceProxyContract.balanceOf(alice.address, 1)).to.equal(500);
    expect(await aliceProxyContract.balanceOf(bob.address, 1)).to.equal(0);
  });
});
