export * from 'web3modal'
import { Provider, useEthereum } from "./useMetis";
import {
  blockchains,
  makeHyperverseBlockchain,
} from "@decentology/hyperverse";

export const Ethereum = makeHyperverseBlockchain({
  name: blockchains.Ethereum,
  Provider: Provider
});

export { Provider, useEthereum };