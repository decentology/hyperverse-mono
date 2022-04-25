import { mintFlow, executeScript, sendTransaction, deployContractByName } from "flow-js-testing";
import { getNFTAdminAddress, getTenantAddress } from "./common.js";

/*
 * Deploys NonFungibleToken and KittyItems contracts to KittyAdmin.
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<[{*} txResult, {error} error]>}
 * */
export const deployNFT = async () => {
  const NFTAdmin = await getNFTAdminAddress();
  await mintFlow(NFTAdmin, "10.0");

  await deployContractByName({ to: NFTAdmin, name: "MetadataViews" });
  return deployContractByName({ to: NFTAdmin, name: "ExampleNFT" });
};

/* Scripts */

export const getTotalSupply = async (tenantId) => {
  const name = "get_total_supply";
  const args = [tenantId];

  return executeScript({ name, args });
};

export const getBalance = async (tenantId, account) => {
  const name = "get_balance";
  const args = [tenantId, account];

  return executeScript({ name, args });
};

export const getNFTIDs = async (tenantId, account) => {
  const name = "get_nft_ids";
  const args = [tenantId, account];

  return executeScript({ name, args });
};

/* Transactions */

export const setup = async (signer) => {

  const signers = [signer];
  const name = "setup";

  return sendTransaction({ name, signers });
};

export const mintNFT = async (signer, recipient, nftName, description, thumbnail = "") => {
  const signers = [signer];
  const name = "mint_nft";
  const args = [recipient, nftName, description, thumbnail];

  return sendTransaction({ name, signers, args });
};

export const transferNFT = async (signer, tenantId, recipient, id) => {
  const signers = [signer];
  const name = "transfer_nft";
  const args = [tenantId, recipient, id];

  return sendTransaction({ name, signers, args });
};