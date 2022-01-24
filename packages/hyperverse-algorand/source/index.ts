import { Provider } from "./context/Algorand";
import { blockchains, makeHyperverseBlockchain } from "@decentology/hyperverse";

export const Algorand = makeHyperverseBlockchain({
  name: blockchains.Algorand,
  Provider: Provider,
  initialize: async (options) => {
    return { client: "testing", explorer: "" };
  },
});

export { Address, Signature, Transactions } from "./components";
export { default as useAlgorand } from "./useAlgorand";
