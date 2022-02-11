import { networks, useHyperverse } from "@decentology/hyperverse";
import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import * as actions from "./actions";
const fcl = require("@onflow/fcl");

function TribesState(initialState: { tenantId: string } = { tenantId: "" }) {
  const [isInitialized, setInitialized] = useState<boolean>(false);

  let { network } = useHyperverse();

  const tenantId = initialState.tenantId;
  const initialize = async () => {
    if (network === networks.Mainnet) {
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

  useEffect(() => {
    initialize();
  }, []);

  return {
    isInitialized,
    leaveTribe: actions.leaveTribe.bind(null, tenantId),
    getAllTribes: actions.getAllTribes.bind(null, tenantId),
    getCurrentTribe: actions.getCurrentTribe.bind(null, tenantId),
    joinTribe: actions.joinTribe.bind(null, tenantId),
    createTenant: actions.createTenant,
    addTribe: actions.addTribe
  };
}

export const FlowTribesContainer = createContainer(TribesState);
export const Provider = FlowTribesContainer.Provider;
export function useTribes() {
  return FlowTribesContainer.useContainer();
}
