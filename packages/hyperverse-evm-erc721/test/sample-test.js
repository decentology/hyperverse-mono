const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('ERC721', function () {
  let ExampleNFT;
  let exampleNFTContract;
  let ExampleNFTFactory;
  let exampleNFTFactoryContract;
  let alice;
  let bob;
  let cara;
  let aliceProxyContract;

  beforeEach(async () => {
    [alice, bob, cara] = await ethers.getSigners();

    ExampleNFT = await ethers.getContractFactory('ExampleNFT');
    exampleNFTContract = await ExampleNFT.deploy();
    await exampleNFTContract.deployed();

    ExampleNFTFactory = await ethers.getContractFactory('ExampleNFTFactory');
    exampleNFTFactoryContract = await ExampleNFTFactory.deploy(exampleNFTContract.address);
    await exampleNFTFactoryContract.deployed();

    await exampleNFTFactoryContract.connect(alice).createInstance("ALICE", "ALC");
    aliceProxyContract = await ExampleNFT.attach(await exampleNFTFactoryContract.getProxy(alice.address));
  });

  it('Master Contract should match exampleNFTContract', async function () {
    expect(await exampleNFTFactoryContract.masterContract()).to.equal(exampleNFTContract.address);
  });

  it("Should match alice's initial token data", async function () {
    expect(await aliceProxyContract.name()).to.equal('ALICE');
    expect(await aliceProxyContract.symbol()).to.equal('ALC');
  });

  it("Should reflect the correct balances", async function () {
    await aliceProxyContract.connect(alice).createNFT();
    expect(await aliceProxyContract.balanceOf(alice.address)).to.equal(1);
    expect(await aliceProxyContract.balanceOf(bob.address)).to.equal(0);
  });
});
