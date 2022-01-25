import * as fcl from "@onflow/fcl";
import * as Hyperverse from "@decentology/hyperverse";

import { Provider } from "./context/Provider";
import { makeHyperverseBlockchain } from "@decentology/hyperverse";

export const Flow = makeHyperverseBlockchain({
  name: Hyperverse.blockchains.Flow,
  Provider: Provider,
  initialize: async (options) => {
    return { client: fcl, explorer: "https://flowscan.org" };
  },
});


export { default as useFlow } from './useFlow'