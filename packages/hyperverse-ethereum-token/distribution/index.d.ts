import { ethers } from "ethers";
import { UseMutationOptions } from "react-query";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
import { FC } from "react";
export function useToken(): {
    tenantId: string;
    contract: ethers.Contract;
    NewInstance: (options?: Omit<UseMutationOptions<unknown, unknown, {
        account: string;
        name: string;
        symbol: string;
        decimal: number;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        account: string;
        name: string;
        symbol: string;
        decimal: number;
    }, unknown>;
    Proxy: () => import("react-query").UseQueryResult<any, unknown>;
    TotalSupply: () => import("react-query").UseQueryResult<any, unknown>;
    Balance: () => import("react-query").UseQueryResult<any, unknown>;
    BalanceOf: (account: string) => import("react-query").UseQueryResult<any, unknown>;
    Transfer: (options?: Omit<UseMutationOptions<unknown, unknown, {
        to: string;
        value: number;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        to: string;
        value: number;
    }, unknown>;
    TransferFrom: (options?: Omit<UseMutationOptions<unknown, unknown, {
        from: string;
        to: string;
        value: number;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        from: string;
        to: string;
        value: number;
    }, unknown>;
    Allowance: (owner: string, spender: string) => import("react-query").UseQueryResult<any, unknown>;
    Mint: (options?: Omit<UseMutationOptions<unknown, unknown, {
        amount: number;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        amount: number;
    }, unknown>;
    Burn: (options?: Omit<UseMutationOptions<unknown, unknown, {
        amount: number;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        amount: number;
    }, unknown>;
    TokenName: () => import("react-query").UseQueryResult<any, unknown>;
    TokenSymbol: () => import("react-query").UseQueryResult<any, unknown>;
    Approve: (options?: Omit<UseMutationOptions<unknown, unknown, {
        spender: string;
        amount: number;
    }, unknown>, "mutationFn"> | undefined) => import("react-query").UseMutationResult<any, unknown, {
        spender: string;
        amount: number;
    }, unknown>;
};
export const Provider: FC<HyperverseModuleInstance>;

//# sourceMappingURL=index.d.ts.map
