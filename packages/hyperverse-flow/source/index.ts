import { blockchains, makeHyperverseBlockchain } from "@decentology/hyperverse";
import { Provider } from "./useFlow";
export { useFlow } from "./useFlow";
export const Flow = makeHyperverseBlockchain({
  name: blockchains.Flow,
  Provider: Provider,
});
