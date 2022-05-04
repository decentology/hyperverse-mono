const { ethers } = require('hardhat');
const { expect } = require('chai');


describe('Tribes', async () => {
  let TribesFactory, Tribes;
  let factoryContract, tribesContract, tribesProxy;
  let owner, alice, bob, cara;

  beforeEach(async () => {
    Tribes = await ethers.getContractFactory('Tribes');
    [owner, alice, bob, cara] = await ethers.getSigners();

    tribesContract = await Tribes.deploy(owner.address);
    await tribesContract.deployed();

    
    TribesFactory = await ethers.getContractFactory('TribesFactory');
    factoryContract = await TribesFactory.deploy(tribesContract.address, owner.address);

    await factoryContract.deployed();

    await factoryContract.connect(alice).createInstance(alice.address);

    tribesProxy = await Tribes.attach(await factoryContract.getProxy(alice.address));
  
 
  });

  describe('Initial', async () => {
    it('Checking owner', async () => {
      expect(await factoryContract.masterContract()).to.equal(tribesContract.address);
    });
  });
  
  describe('No Instance', async () => {
    it('Add a Tribe without instance should error', async () => {
      await expect(tribesProxy.connect(bob).addNewTribe('metadata')).to.be.revertedWith(
        'Unauthorized()',
      );
    });

    it('Joining tribe with uninstantiated Tenant should error', async () => {
      await expect(tribesProxy.connect(bob).joinTribe(1)).to.be.revertedWith('TribeDoesNotExist()');
    });

    it('Leaving tribe with uninstantiated Tenant should error', async () => {
      await expect(tribesProxy.connect(bob).leaveTribe()).to.be.revertedWith('UserNotInATribe()');
    });

  });

  describe('With an instance', async () => {
    beforeEach(async () => {
      await factoryContract.connect(cara).createInstance(cara.address);
      tribesProxy = await Tribes.attach(await factoryContract.getProxy(cara.address));
      
      await tribesProxy.connect(cara).addNewTribe('metadata');
      await tribesProxy.connect(cara).addNewTribe('metadata');
  
    });

      it('Should allow users to join a tribe' , async () => {
         expect(tribesProxy.connect(bob).joinTribe(1));
      })

      it('Should allow users to leave a tribe' , async () => {
         expect(tribesProxy.connect(bob).leaveTribe());
      })

      it('Should allow anyone to get a tribe by user addr', async () => {
        await tribesProxy.connect(bob).joinTribe(1);
        
        expect(await tribesProxy.getUserTribe(bob.address)).to.equal(1);
      })

      it('Should not allow a user in a tribe to join another', async () => {
        await tribesProxy.connect(bob).joinTribe(1);
        await expect(tribesProxy.connect(bob).joinTribe(1)).to.be.revertedWith('UserInATribe()');
      })
 
      it('Should not allow a user to leave a tribe if they are not in one', async () => {
        await tribesProxy.connect(bob).joinTribe(1);
        await tribesProxy.connect(bob).leaveTribe();
        await expect(tribesProxy.connect(bob).leaveTribe()).to.be.revertedWith('UserNotInATribe()');
      })
  });


});
