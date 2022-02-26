import { ethers } from "ethers";
import { UseMutationOptions } from "react-query";
import { FC } from "react";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
export function useERC721(): {
    tenantId: string;
    contract: ethers.Contract;
    NewInstance: (options?: Omit<UseMutationOptions<unknown, unknown, {
        name: string;
        symbol: string;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        name: string;
        symbol: string;
    }, unknown>;
    Proxy: () => import("react-query").UseQueryResult<any, unknown>;
    TotalSupply: () => import("react-query").UseQueryResult<any, unknown>;
    Balance: () => import("react-query").UseQueryResult<any, unknown>;
    BalanceOf: (account: string) => import("react-query").UseQueryResult<any, unknown>;
    MintNFT: (options?: Omit<UseMutationOptions<unknown, unknown, {
        to: string;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        to: string;
    }, unknown>;
};
export const Provider: FC<HyperverseModuleInstance>;

//# sourceMappingURL=index.d.ts.map
