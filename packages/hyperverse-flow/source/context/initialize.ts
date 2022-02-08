const fcl = require("@onflow/fcl");
import { networks } from '@decentology/hyperverse'
export const Initialize = async (network: string) => {
  if (network != null) {
    let explorer: string;
    if (network == networks.Mainnet) {
      explorer = "https://flowscan.org";
      fcl.config()
        .put("accessNode.api", "https://flow-access-mainnet.portto.io")
        .put("discovery.wallet", "https://flow-wallet.blocto.app/authn")
        .put("0xFungibleToken", "0xf233dcee88fe0abe")
        .put("0xFlowToken", "0x1654653399040a61");
    } else {
      explorer = "https://testnet.flowscan.org";
      fcl.config()
        .put("accessNode.api", "https://access-testnet.onflow.org")
        .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn")
        .put("0xFungibleToken", "0x9a0766d93b6608b7")
        .put("0xFlowToken", "0x7e60df042a9c0868");
    }
    return {
      client: fcl,
      explorer
    };
  }
  return {
    client: null,
    explorer: null
  };
};