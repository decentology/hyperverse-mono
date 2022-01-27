export * from "wagmi";
import { Provider } from "./Provider";
import {
  blockchains,
  makeHyperverseBlockchain,
} from "@decentology/hyperverse";

export const Ethereum = makeHyperverseBlockchain({
  name: blockchains.Ethereum,
  Provider: Provider,
  initialize: async (options) => {
    return { client: "testing", explorer: "" };
  },
});
export { default as useEthereum } from "./useEthereum";
