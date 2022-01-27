import { createContext, FC } from "react";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { QueryClientProvider, QueryClient } from "react-query";
import ABI from "../utils/Tribes.json";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
const client = new QueryClient();

const Context = createContext({});
Context.displayName = "EthereumTribesContext";

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = "0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352";
export const TENANT_ADDRESS = "0xD847C7408c48b6b6720CCa75eB30a93acbF5163D";

Context.displayName = "EthereumTribesContext";

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
  const ethereum = useEthereum();
  return (
      <QueryClientProvider client={client}>
        <Context.Provider value={{}}>{children}</Context.Provider>
      </QueryClientProvider>
  );
};

export { Context, Provider };
