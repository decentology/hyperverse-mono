const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');

let unitMultiple = new BigNumber.from(10).pow(new BigNumber.from(3));
let initialSupply = new BigNumber.from(1000000).mul(unitMultiple);

describe('Token', function () {
<<<<<<< HEAD
	let TokenMain;
	let tokenMainCtr;
	let TokenFactory;
	let tokenFactoryCtr;
	let alice;
	let bob;
	let cara;
	let aliceProxyContract;

	beforeEach(async () => {
		TokenMain = await ethers.getContractFactory('Token');
		[owner, alice, bob, cara] = await ethers.getSigners();

		tokenMainCtr = await TokenMain.deploy(owner.address);
		await tokenMainCtr.deployed();

		TokenFactory = await ethers.getContractFactory('TokenFactory');
		tokenFactoryCtr = await TokenFactory.deploy(tokenMainCtr.address, owner.address);
		await tokenFactoryCtr.deployed();

		await tokenFactoryCtr.connect(alice).createInstance(alice.address, 'ALICE', 'ALC', '6');

		const main = await ethers.getContractFactory('Token');
		aliceProxyContract = await main.attach(await tokenFactoryCtr.getProxy(alice.address));
	});

	describe('Initial State Variables', function () {
		it('Master Contract should match tokenMainCtr', async function () {
			expect(await tokenFactoryCtr.masterContract()).to.equal(tokenMainCtr.address);
		});
=======
  let TokenMain;
  let tokenMainCtr;
  let TokenFactory;
  let tokenFactoryCtr;
  let alice;
  let bob;
  let cara;
  let aliceProxyContract;
>>>>>>> d8ceff1 (Test)

		it("Should match alice's initial token data", async function () {
			expect(await aliceProxyContract.name()).to.equal('ALICE');
			expect(await aliceProxyContract.symbol()).to.equal('ALC');
			expect(await aliceProxyContract.decimals()).to.equal(6);
		});

		it('Should have the correct supply off tokens using totalSupply()', async function () {
			expect(await aliceProxyContract.totalSupply()).to.equal(initialSupply);
		});

		it('Should have correct balance of tokens using balance() and balanceOf()', async function () {
			expect(await aliceProxyContract.connect(alice).balance()).to.equal(initialSupply);
			expect(await aliceProxyContract.balanceOf(alice.address)).to.equal(initialSupply);
		});
	});

	describe('Transfer', function () {
		it('Should be able to transfer funds using transfer()', async function () {
			const sourceAccount = alice.address;
			const tragetAccount = cara.address;
			const amount = new BigNumber.from(1000);

<<<<<<< HEAD
			const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
			const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

			const transferTxn = await aliceProxyContract
				.connect(alice)
				.transfer(tragetAccount, amount);

			const sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
			const targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

			expect(sourceNewBal).to.not.equal(sourceOldBal);
			expect(targetOldBal).to.not.equal(targetNewBal);
			expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
		});

		it('Should approve funds tranfer using approve() and check spend amount using allowance()', async function () {
			const sourceAccount = alice.address;
			const tragetAccount = cara.address;
			const amount = new BigNumber.from(500).mul(unitMultiple);

			await aliceProxyContract.connect(alice).approve(tragetAccount, amount);

			const allowance = await aliceProxyContract.allowance(sourceAccount, tragetAccount);

			expect(allowance).to.equal(amount);
		});

		it('Should transfer allowance funds between accounts using tranferFrom()', async function () {
			const sourceAccount = alice.address;
			const tragetAccount = cara.address;
			const authorizedAccount = bob.address;
			const amount = new BigNumber.from(500).mul(unitMultiple);

			const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
			const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

			await aliceProxyContract.connect(alice).approve(authorizedAccount, amount);

			let oldAllowance = await aliceProxyContract.allowance(sourceAccount, authorizedAccount);

			await aliceProxyContract
				.connect(bob)
				.transferFrom(sourceAccount, tragetAccount, amount);

			let sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
			let targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

			let newAllowance = await aliceProxyContract.allowance(sourceAccount, authorizedAccount);

			expect(sourceNewBal).to.not.equal(sourceOldBal);
			expect(targetOldBal).to.not.equal(targetNewBal);
			expect(oldAllowance).to.not.equal(newAllowance);
			expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
			expect(newAllowance).to.equal(oldAllowance.sub(amount));
			expect(newAllowance).to.equal(0);
		});
=======
    TokenFactory = await ethers.getContractFactory('TokenFactory');
    tokenFactoryCtr = await TokenFactory.deploy(tokenMainCtr.address);
    await tokenFactoryCtr.deployed();

   await tokenFactoryCtr.connect(alice).createInstance(alice.address, 'ALICE', 'ALC', '6');

    const main = await ethers.getContractFactory('Token');
    aliceProxyContract = await main.attach(await tokenFactoryCtr.getProxy(alice.address));
  });

  it('Master Contract should match tokenMainCtr', async function () {
    expect(await tokenFactoryCtr.masterContract()).to.equal(tokenMainCtr.address);
  });

  it("Should match alice's initial token data", async function () {
    expect(await aliceProxyContract.name()).to.equal('ALICE');
    expect(await aliceProxyContract.symbol()).to.equal('ALC');
    expect(await aliceProxyContract.decimals()).to.equal(6);
  });

  it('Should have the coreect supply off tokens using totalSupply()', async function () {
    //old way
    expect(await tokenFactoryCtr.totalSupply(alice.address)).to.equal(initialSupply);

    //new way
    expect(await aliceProxyContract.totalSupply()).to.equal(initialSupply);
  });

  it('Should have correct balance of tokens using balance() and balanceOf()', async function () {
    expect(await aliceProxyContract.connect(alice).balance()).to.equal(initialSupply);
    expect(await aliceProxyContract.balanceOf(alice.address)).to.equal(initialSupply);
  });

  it('Should be able to transfer funds using transfer()', async function () {
    const sourceAccount = alice.address;
    const tragetAccount = cara.address;
    const amount = new BigNumber.from(1000);

    const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
    const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

    const transferTxn = await aliceProxyContract.connect(alice).transfer(tragetAccount, amount);

    const sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
    const targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

    expect(sourceNewBal).to.not.equal(sourceOldBal);
    expect(targetOldBal).to.not.equal(targetNewBal);
    expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
  });

  it('Should approve funds tranfer using approve() and check spend amount using allowance()', async function () {
    const sourceAccount = alice.address;
    const tragetAccount = cara.address;
    const amount = new BigNumber.from(500).mul(unitMultiple);

    await aliceProxyContract.connect(alice).approve(tragetAccount, amount);

    const allowance = await aliceProxyContract.allowance(sourceAccount, tragetAccount);

    expect(allowance).to.equal(amount);
  });

  it('Should transfer allowance funds between accounts using tranferFrom()', async function () {
    const sourceAccount = alice.address;
    const tragetAccount = cara.address;
    const authorizedAccount = bob.address;
    const amount = new BigNumber.from(500).mul(unitMultiple);

    const sourceOldBal = await aliceProxyContract.balanceOf(sourceAccount);
    const targetOldBal = await aliceProxyContract.balanceOf(tragetAccount);

    await aliceProxyContract.connect(alice).approve(authorizedAccount, amount);

    let oldAllowance = await aliceProxyContract.allowance(sourceAccount, authorizedAccount);

    await aliceProxyContract.connect(bob).transferFrom(sourceAccount, tragetAccount, amount);

    let sourceNewBal = await aliceProxyContract.balanceOf(sourceAccount);
    let targetNewBal = await aliceProxyContract.balanceOf(tragetAccount);

    let newAllowance = await aliceProxyContract.allowance(sourceAccount, authorizedAccount);

    expect(sourceNewBal).to.not.equal(sourceOldBal);
    expect(targetOldBal).to.not.equal(targetNewBal);
    expect(oldAllowance).to.not.equal(newAllowance);
    expect(sourceNewBal).to.equal(sourceOldBal.sub(amount));
    expect(newAllowance).to.equal(oldAllowance.sub(amount));
    expect(newAllowance).to.equal(0);
  });
>>>>>>> d8ceff1 (Test)

		it('Should not transfer funds between acounts using transferFrom() unless authorized', async function () {
			const sourceAccount = alice.address;
			const tragetAccount = cara.address;
			const authorizedAccount = bob.address;
			const amount = new BigNumber.from(500).mul(unitMultiple);

			// const transferTxn = await aliceProxyContract.connect(bob).transferFrom(sourceAccount, tragetAccount, amount);
			await expect(
				aliceProxyContract.connect(bob).transferFrom(sourceAccount, tragetAccount, amount)
			).to.be.revertedWith('Not enough allowed balance for transfer');
		});
	});

  describe('Minting', function () {
    it('Should mint tokens using mint()', async function () {
      const amount = new BigNumber.from(500).mul(unitMultiple);

      const mintTxn = await aliceProxyContract.connect(alice).mint(amount);

      const newBal = await aliceProxyContract.balanceOf(alice.address);

      expect(newBal).to.equal(initialSupply.add(amount));
    });

    it('Should not mint tokens using mint() if not owner', async function () {
      const amount = new BigNumber.from(500).mul(unitMultiple);

      await expect(
        aliceProxyContract.connect(bob).mint(amount)
      ).to.be.revertedWith('You are not the tenant owner');
    });
  
  })

  describe('Burning', function () {
    it('Should burn Alice\'s tokens', async function () {
      const amount = new BigNumber.from(500).mul(unitMultiple);

      const oldBal = await aliceProxyContract.balanceOf(alice.address);
       await aliceProxyContract.connect(alice).burn(amount);

      const newBal = await aliceProxyContract.balanceOf(alice.address);

      expect(oldBal).to.not.equal(newBal);
      expect(newBal).to.equal(initialSupply.sub(amount));
    })
  })
});
