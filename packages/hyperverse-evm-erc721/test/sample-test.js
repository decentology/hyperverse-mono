const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('ERC721', function () {
  let ERC721;
  let erc721ctr;
  let ERC721Factory;
  let erc721factoryCtr;
  let alice;
  let bob;
  let owner;
  let aliceProxyContract;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    ERC721 = await ethers.getContractFactory('ERC721');
    erc721ctr = await ERC721.deploy(owner.address);
    await erc721ctr.deployed();

    ERC721Factory = await ethers.getContractFactory('ERC721Factory');
    erc721factoryCtr = await ERC721Factory.deploy(erc721ctr.address, owner.address);
    await erc721factoryCtr.deployed();

    await erc721factoryCtr.connect(alice).createInstance(alice.address, "ALICE", "ALC", false);
    aliceProxyContract = await ERC721.attach(await erc721factoryCtr.getProxy(alice.address));
  });

  it('Master Contract should match exampleNFTContract', async function () {
    expect(await erc721factoryCtr.masterContract()).to.equal(erc721ctr.address);
  });

  it("Should match alice's initial token data", async function () {
    expect(await aliceProxyContract.name()).to.equal('ALICE');
    expect(await aliceProxyContract.symbol()).to.equal('ALC');
  });

});
