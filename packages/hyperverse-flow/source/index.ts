import * as Hyperverse from "@decentology/hyperverse";

import { Provider } from "./context/Provider";
import { makeHyperverseBlockchain } from "@decentology/hyperverse";

export const Flow = makeHyperverseBlockchain({
  name: Hyperverse.blockchains.Flow,
  Provider: Provider,
});


export { default as useFlow } from './useFlow'