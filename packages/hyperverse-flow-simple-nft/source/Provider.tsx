import { createContext, FC, useEffect, useState } from "react";
const fcl = require("@onflow/fcl");
import {
  HyperverseModuleInstance,
  networks,
  useHyperverse,
} from "@decentology/hyperverse";
import * as actions from "./actions";
import { Bind1 } from "./types";
type FlowSimpleNFTContext = {
  isInitialized: boolean;
  setupCollection: Bind1<typeof actions.setupCollection>;
  mintNFT: typeof actions.mintNFT;
  getAllIDs: typeof actions.getAllIDs;
  getTenantIDs: Bind1<typeof actions.getTenantIDs>;
  getMetadata: typeof actions.getMetadata;
} | null;

const Context = createContext<FlowSimpleNFTContext>(null);

const Provider: FC<HyperverseModuleInstance> = (props) => {
  const [isInitialized, setInitialized] = useState<boolean>(false);

  let { network } = useHyperverse();

  const tenantId = props.tenantId;
  console.log("tenantId", tenantId);
  const initialize = async () => {
    if (network === networks.MainNet) {
      // TODO: Deploy to Flow Mainnet.
    } else if (network === networks.TestNet) {
      fcl.config().put("0xSimpleNFT", "FILL THIS IN");
    }

    const SimpleNFTAddress = await fcl.config().get("0xSimpleNFT");
    if (typeof SimpleNFTAddress !== "undefined") {
      setInitialized(true);
    } else {
      setInitialized(false);
    }
  };

  // const boundActions = {} as typeof actions;
  // for(const actionName in actions) {
  //   // @ts-ignore
  //   boundActions[actionName] = actions[actionName].bind(null, {
  //     tenantId,
  //   });
  // }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Context.Provider
      value={{
        isInitialized,
        setupCollection: actions.setupCollection,
        mintNFT: actions.mintNFT,
        getAllIDs: actions.getAllIDs,
        getTenantIDs: actions.getTenantIDs.bind(null, tenantId),
        getMetadata: actions.getMetadata,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
