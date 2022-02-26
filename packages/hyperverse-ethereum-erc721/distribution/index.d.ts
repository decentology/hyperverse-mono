import { UseMutationOptions } from "react-query";
import { ethers } from "ethers";
import { FC } from "react";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
export function useERC721(): {
    tenantId: string;
    contract: ethers.Contract;
    NewInstance: (options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<unknown, unknown, {
        name: any;
        symbol: any;
    }, unknown>;
    MintNFT: (options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<unknown, unknown, void, unknown>;
    GetBalance: () => import("react-query").UseQueryResult<any, unknown>;
};
export const Provider: FC<HyperverseModuleInstance>;

//# sourceMappingURL=index.d.ts.map
