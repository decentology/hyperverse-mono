const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('NFTGame', function () {
  let NFTGame;
  let nftGamectr;
  let NFTGameFactory;
  let nftGamefactoryCtr;
  let alice;
  let bob;
  let owner;
  let aliceProxyContract;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    NFTGame = await ethers.getContractFactory('NFTGame');
    nftGamectr = await NFTGame.deploy(owner.address);
    await nftGamectr.deployed();

    NFTGameFactory = await ethers.getContractFactory('NFTGameFactory');
    nftGamefactoryCtr = await NFTGameFactory.deploy(nftGamectr.address, owner.address);
    await nftGamefactoryCtr.deployed();

    await nftGamefactoryCtr.connect(alice).createInstance(alice.address, "ALICE", "ALC");
    aliceProxyContract = await NFTGame.attach(await nftGamefactoryCtr.getProxy(alice.address));

    aliceProxyContract.connect(alice).setMintPermissions(true);
  });

  it('Master Contract should match exampleNFTContract', async function () {
    expect(await nftGamefactoryCtr.masterContract()).to.equal(nftGamectr.address);
  });

  it("Should match alice's initial token data and mint", async function () {
    expect(await aliceProxyContract.name()).to.equal('ALICE');
    expect(await aliceProxyContract.symbol()).to.equal('ALC');

    const txn = await aliceProxyContract.mint(alice.address, 'FOAD 1', 1, 2, 3, 0, [1,1,0,0,0], [1,1,0,0,0], [0,0], [0,0]);
    const receipt = await txn.wait();
    const setURI = await aliceProxyContract.connect(alice).setBaseURI("https://example.com/");
    
    expect(await aliceProxyContract.getBaseURI()).to.equal("https://example.com/");
    const tokenUri = await aliceProxyContract.connect(alice).tokenURI(1);
    console.log('Token URI -', tokenUri)

    const getTokenAttr = await aliceProxyContract.connect(alice).getAttributesByTokenId(1);
    tokenId = parseInt(getTokenAttr[0])
    console.log('Token ID -', tokenId)

  });

  it("Should modify dynamic attributes data", async function () {

    const getStandardMemoryBefore = await aliceProxyContract.connect(alice).getStandardAttrMemory();
    console.log('Standard Token Attr Before -', getStandardMemoryBefore)

    const modifyAttr = await aliceProxyContract.connect(alice).modifyDynamicAttribute(0, [2,1,2,2,3]);
    const getStandardMemoryAfter = await aliceProxyContract.connect(alice).getStandardAttrMemory();
    
    console.log('Standard Token Attr After -', getStandardMemoryAfter)
  });

  it("Should set attributes for NFT", async function () {

    await aliceProxyContract.connect(alice).setDynamicAttribute(1, 0, [1,1,1,1,1]);

    const getTokenAttr1 = await aliceProxyContract.connect(alice).getAttributesByTokenId(1);
    console.log('Token Info -', getTokenAttr1)
  });

  // it("Should level-up NFT attributes", async function () {

  //   await aliceProxyContract.connect(alice).levelUp(1);

  //   const getTokenAttr1 = await aliceProxyContract.connect(alice).getAttributesByTokenId(1);
  //   console.log('NFT data after -', getTokenAttr1)
  // });

});
