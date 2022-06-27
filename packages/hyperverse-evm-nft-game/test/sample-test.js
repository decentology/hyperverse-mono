const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('NFTGame1', function () {
  let NFTGame1;
  let nftGame1ctr;
  let NFTGame1Factory;
  let nftGame1factoryCtr;
  let alice;
  let bob;
  let owner;
  let aliceProxyContract;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    NFTGame1 = await ethers.getContractFactory('NFTGame1');
    nftGame1ctr = await NFTGame1.deploy(owner.address);
    await nftGame1ctr.deployed();

    NFTGame1Factory = await ethers.getContractFactory('NFTGame1Factory');
    nftGame1factoryCtr = await NFTGame1Factory.deploy(nftGame1ctr.address, owner.address);
    await nftGame1factoryCtr.deployed();

    await nftGame1factoryCtr.connect(alice).createInstance(alice.address, "ALICE", "ALC");
    aliceProxyContract = await NFTGame1.attach(await nftGame1factoryCtr.getProxy(alice.address));

    aliceProxyContract.connect(alice).initializeCollection(ethers.utils.parseEther("0.00"), 100, 5)
    aliceProxyContract.connect(alice).setMintPermissions(true);
  });

  it('Master Contract should match exampleNFTContract', async function () {
    expect(await nftGame1factoryCtr.masterContract()).to.equal(nftGame1ctr.address);
  });

  it("Should match alice's initial token data", async function () {
    expect(await aliceProxyContract.name()).to.equal('ALICE');
    expect(await aliceProxyContract.symbol()).to.equal('ALC');

    const txn = await aliceProxyContract.mint(alice.address, 'FOAD 1', 1, 2, 3);
    const receipt = await txn.wait();
    const setURI = await aliceProxyContract.connect(alice).setBaseURI("https://example.com/");
    
    expect(await aliceProxyContract.getBaseURI()).to.equal("https://example.com/");
    const tokenUri = await aliceProxyContract.connect(alice).tokenURI(1);
    console.log('Token URI -', tokenUri)
  });

});
