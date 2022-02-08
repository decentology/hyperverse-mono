import { Provider } from "./context/Provider";
import { blockchains, makeHyperverseBlockchain } from "@decentology/hyperverse";

export const Algorand = makeHyperverseBlockchain({
  name: blockchains.Algorand,
  Provider: Provider,
});

export { Address, Signature, Transactions } from "./components";
export { default as useAlgorand } from "./useAlgorand";
