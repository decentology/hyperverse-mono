import { FC } from 'react';
import { ContainerProvider } from '@decentology/unstated-next';
import Blockchain from './constants/blockchains';
import Network from './constants/networks';
import Storage from './constants/storage';
type Exact<A, B> = A extends B ? (B extends A ? A : never) : never;

export function makeHyperverseBlockchain<T extends HyperverseBlockchain<unknown>>(payload: T): T {
	return payload;
}

export type HyperverseBlockchainInit<T> = (
	options: Hyperverse
) => Promise<BlockchainFeatures<T>> | unknown;

export type HyperverseBlockchain<T> = {
	name: Blockchain;
	Provider: FC<unknown> | ContainerProvider<unknown> | ContainerProvider<any>
};

export type BlockchainFeatures<T> = {
	client: any;
	explorer: string;
	extra?: T;
};
export type BlockchainFeatures2<T extends {}> = T & {
	client: any;
	explorer: string;
};

export type Hyperverse = {
	blockchain: HyperverseBlockchain<unknown> | null;
	network: Network;
	storage?: Storage | ({ name?: Storage; options: { clientUrl: string } } | undefined);
	modules: HyperverseModuleBase[];
	options?: {
		disableProviderAutoInit?: boolean;
	};
};
export type HyperverseModuleBase = {
	bundle: {
		Provider: FC<HyperverseModuleInstance>;
	};
	tenantId: string;
	autoLoadContext?: boolean;
};
export type HyperverseModule = {
	network: Network;
	blockchain: Blockchain;
} & HyperverseModuleBase;

export type HyperverseModuleInstance = {
	tenantId?: string;
	// network: Network;
	// blockchain: Blockchain;
};
