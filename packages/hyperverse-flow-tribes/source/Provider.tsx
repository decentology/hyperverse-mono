import { createContext, FC, useEffect, useState } from "react";
const fcl = require("@onflow/fcl");
import {
  HyperverseModuleInstance,
  networks,
  useHyperverse,
} from "@decentology/hyperverse";
import * as actions from "./actions";
import { Bind1 } from "./types";
type FlowTribesContext = {
  isInitialized: boolean;
  leaveTribe: Bind1<typeof actions.leaveTribe>;
  getAllTribes: Bind1<typeof actions.getAllTribes>;
  joinTribe: Bind1<typeof actions.joinTribe>;
  getCurrentTribe: Bind1<typeof actions.getCurrentTribe>;
} | null;

const Context = createContext<FlowTribesContext>(null);

const Provider: FC<HyperverseModuleInstance> = (props) => {
  const [isInitialized, setInitialized] = useState<boolean>(false);

  let { network } = useHyperverse();

  const tenantId = props.tenantId;
  const initialize = async () => {
    if (network === networks.MainNet) {
      // TODO: Deploy to Flow Mainnet.
    } else if (network === networks.Testnet) {
      fcl.config().put("0xTribes", "0x1960ff14acc51991");
    }

    const TribesAddress = await fcl.config().get("0xTribes");
    if (typeof TribesAddress !== "undefined") {
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
        leaveTribe: actions.leaveTribe.bind(null, tenantId),
        getAllTribes: actions.getAllTribes.bind(null, tenantId),
        getCurrentTribe: actions.getCurrentTribe.bind(null, tenantId),
        joinTribe: actions.joinTribe.bind(null, tenantId),
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
