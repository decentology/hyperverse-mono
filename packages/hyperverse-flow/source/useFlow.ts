import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { useHyperverse } from "@decentology/hyperverse";
import { FlowUser } from "./types";
import { useAsync } from "react-async-hook";
import { Initialize } from "./context/initialize";
import sendFlow from "./context/sendFlow";
import fetchBalance from "./context/fetchBalance";
const fcl = require("@onflow/fcl");
function FlowState() {
  const { network } = useHyperverse();
  const [user, setUser] = useState<FlowUser>(null);

  const {
    result: { client, explorer } = {},
    status,
    error,
    loading,
  } = useAsync(Initialize, [network], {
    initialState: () => {
      return {
        error: undefined,
        loading: true,
        status: "loading",
        result: {
          client: null,
          explorer: null,
        },
      };
    },
  });

  const isInitialized = user !== null;

  const loggedIn = !!user?.loggedIn;

  const authenticate = async () => {
    fcl.authenticate();
  };

  const unauthenticate = async () => {
    fcl.unauthenticate();
  };

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);
  if (!explorer) {
    return null;
  }
  return {
    user,
    isInitialized,
    authenticate,
    unauthenticate,
    fetchBalance,
    sendFlow,
    client,
    explorer,
    loggedIn,
  };
}

const FlowContainer = createContainer(FlowState);
export const Provider = FlowContainer.Provider;

export function useFlow() {
  return FlowContainer.useContainer();
}
