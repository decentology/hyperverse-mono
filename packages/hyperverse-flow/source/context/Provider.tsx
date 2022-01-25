import React, { useReducer, useState, useEffect, createContext, VFC, FC } from "react";
import * as fcl from "@onflow/fcl";
import authenticate from "./authenticate";
import unauthenticate from "./unauthenticate";
import sendFlow from "./sendFlow";
import fetchBalance from "./fetchBalance";
import { useAsync } from "react-async-hook";
import { Initialize } from "./initialize";
import { useHyperverse } from "@decentology/hyperverse";

type FlowContext = {
  user?: {};
  balance?: Number;
  isInitialized?: boolean;
  authenticate?: typeof authenticate;
  unauthenticate?: typeof unauthenticate;
  fetchBalance?: typeof fetchBalance;
  updateBalance?: () => Promise<void>;
  sendFlow?: typeof sendFlow;
  client?: fcl;
  explorer?: string;
  loggedIn?;
};

const Context = createContext<FlowContext>({});
Context.displayName = "FlowContext";

const Provider: FC<any> = ({ children }) => {
  const { network } = useHyperverse();
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);

  const {
    result: { client, explorer } = {},
    status,
    error,
    loading,
  } = useAsync(Initialize, [network], {
    initialState: () => {
      return {
        error: null,
        loading: true,
        status: null,
        result: {
          client: null,
          explorer: null
        },
      };
    },
  });

  const isInitialized = user !== null;

  const loggedIn = user && user.loggedIn;

  const authenticate = async () => {
    fcl.authenticate();
  };

  const unauthenticate = async () => {
    fcl.unauthenticate();
  };

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        balance,
        isInitialized,
        authenticate,
        unauthenticate,
        fetchBalance,
        sendFlow,
        client,
        explorer,
        loggedIn
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
