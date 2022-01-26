import {
  useReducer,
  useState,
  useEffect,
  createContext,
  VFC,
  FC,
} from "react";
const fcl = require("@onflow/fcl");
import sendFlow from "./sendFlow";
import fetchBalance from "./fetchBalance";
import { useAsync } from "react-async-hook";
import { Initialize } from "./initialize";
import { useHyperverse } from "@decentology/hyperverse";

type FlowUser = {
  f_type: "User";
  f_vsn: "1.0.0";
  addr: null;
  cid: null;
  loggedIn: null;
  expiresAt: null;
  services: [];
} | null;

type FlowContext = {
  user?: FlowUser;
  balance?: Number;
  isInitialized?: boolean;
  fetchBalance?: typeof fetchBalance;
  updateBalance?: () => Promise<void>;
  sendFlow?: typeof sendFlow;
  client?: typeof fcl;
  explorer?: string | null;
  loggedIn?: boolean;
} | null;

const Context = createContext<FlowContext>(null);
Context.displayName = "FlowContext";

const Provider: FC<any> = ({ children }) => {
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

  return (
    <Context.Provider
      value={{
        user,
        isInitialized,
        fetchBalance,
        sendFlow,
        client,
        explorer,
        loggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
