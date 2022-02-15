import { FC } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import ABI from "../utils/RandomPick.json";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
import { RandomPick } from "./useRandomPick";
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = "0x4AdCd27fdAe4647ccD5EdC31B68De74f2D342c1a";
export const TENANT_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
  return (
    <QueryClientProvider client={client}>
      <RandomPick.Provider initialState={{ tenantId: tenantId || TENANT_ADDRESS }}>
        {children}
      </RandomPick.Provider>
    </QueryClientProvider>
  );
};

export { Provider };
