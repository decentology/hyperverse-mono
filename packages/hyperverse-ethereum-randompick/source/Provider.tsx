import { FC } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import ABI from "../utils/RandomPick.json";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
import { RandomPick } from "./useRandomPick";
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_ADDRESS = "0x9FC0FE344758ff0dB70Aa7c864b2de53A79CA776";
export const TENANT_ADDRESS = "0x45e4c90801b1a17c178bB9855aA181A886DAA603";

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
