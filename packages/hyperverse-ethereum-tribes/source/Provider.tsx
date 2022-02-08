import { createContext, FC } from "react";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { QueryClientProvider, QueryClient } from "react-query";
import ABI from "../utils/Tribes.json";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
import { Tribes } from "./useTribes";
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = "0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352";
export const TENANT_ADDRESS = "0xD847C7408c48b6b6720CCa75eB30a93acbF5163D";

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
  return (
    <QueryClientProvider client={client}>
      <Tribes.Provider initialState={{ tenantId: tenantId || TENANT_ADDRESS }}>
        {children}
      </Tribes.Provider>
    </QueryClientProvider>
  );
};

export { Provider };
