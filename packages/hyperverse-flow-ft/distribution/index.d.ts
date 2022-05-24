import { HyperverseModuleInstance } from "@decentology/hyperverse";
import { FC } from "react";
type Tail<T extends readonly unknown[]> = T extends readonly [infer _, ...infer Tail] ? Tail : [];
export type Bind1<Fn extends (...args: any) => any> = (...args: Tail<Parameters<Fn>>) => ReturnType<Fn>;
export type TribesData = {
    name: string;
    ipfsHash: string;
    description: string;
};
export type FlowTransaction = {
    errorMessage: string;
    events: FlowEvent[];
    status: number;
    statusCode: number;
};
export type FlowEvent = {
    data: any;
    type: string;
    transactionId: string;
    transactionIndex: number;
    eventIndex: number;
};
export function useToken(): {
    isInitialized: boolean;
};
export const Provider: FC<HyperverseModuleInstance>;

//# sourceMappingURL=index.d.ts.map
