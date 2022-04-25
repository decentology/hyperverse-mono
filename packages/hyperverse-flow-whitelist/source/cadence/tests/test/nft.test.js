import path from "path";

import {
  emulator,
  init,
  getAccountAddress,
  shallPass,
  shallResolve,
  shallRevert,
} from "flow-js-testing";

import {
  setup,
  deployNFT, getTotalSupply, mintNFT, getBalance, transferNFT, getNFTIDs,
} from "../src/nft.js";
import { getTenantAddress, getUserAddress } from "../src/common.js";

// We need to set timeout for a higher number, because some transactions might take up some time
jest.setTimeout(50000);

describe("ExampleNFT", () => {
  // Instantiate emulator and path to Cadence files
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, "../../");
    const port = 7002;
    await init(basePath, { port });
    await emulator.start(port, false);
    return await new Promise(r => setTimeout(r, 1000));
  });

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    await emulator.stop();
    return await new Promise(r => setTimeout(r, 1000));
  });

  it("should deploy NFT contract", async () => {
    await shallPass(deployNFT());
  });

  it("totalSupply shall be 1 after tenant created and nft minted", async () => {
    // Setup
    await deployNFT();
    const Tenant = await getTenantAddress();

    await shallPass(setup(Tenant));
    await shallPass(mintNFT(Tenant, Tenant, "Jacob", "Jacob loves chocolate chip pancakes"));

    const [totalSupply] = await shallResolve(getTotalSupply(Tenant));
    expect(totalSupply).toBe(1);
  });

  it("balance shall be 1 after nft minted", async () => {
    // Setup
    await deployNFT();
    const Tenant = await getTenantAddress();

    await shallPass(setup(Tenant));
    await shallPass(mintNFT(Tenant, Tenant, "Jacob", "Jacob loves chocolate chip pancakes"));

    const [balance] = await shallResolve(getBalance(Tenant, Tenant));
    expect(balance).toBe(1);
  });

  it("balance shall be 0 after nft transferred", async () => {
    // Setup
    await deployNFT();
    const Tenant = await getTenantAddress();
    const User = await getUserAddress();

    await shallPass(setup(Tenant));
    await shallPass(mintNFT(Tenant, Tenant, "Jacob", "Jacob loves chocolate chip pancakes"));

    const [ids] = await shallResolve(getNFTIDs(Tenant, Tenant));
    await shallPass(setup(User));
    await shallPass(transferNFT(Tenant, Tenant, User, ids[0]));

    const [balance1] = await shallResolve(getBalance(Tenant, Tenant));
    expect(balance1).toBe(0);

    const [balance2] = await shallResolve(getBalance(Tenant, User));
    expect(balance2).toBe(1);
  });
});