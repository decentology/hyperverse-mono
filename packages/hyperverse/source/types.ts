import { FC } from 'react';
import { ContainerProvider } from '@decentology/unstated-next';
import { Blockchain, BlockchainEvm } from './constants/blockchains';
import { Network, NetworkConfig } from './constants/networks';
import Storage from './constants/storage';
import { SkynetStorageLibrary } from '@decentology/hyperverse-storage-skynet';
type Exact<A, B> = A extends B ? (B extends A ? A : never) : never;

export function makeHyperverseBlockchain<T extends HyperverseBlockchain<unknown>>(payload: T): T {
	return payload;
}

export type HyperverseBlockchainInit<T> = (
	options: Hyperverse
) => Promise<BlockchainFeatures<T>> | unknown;

export type HyperverseBlockchain<T> = {
	name: Blockchain;
	getNetwork?: (network: Network) => NetworkConfig;
	Provider: FC<unknown> | ContainerProvider<unknown> | ContainerProvider<any>;
};

export type BlockchainFeatures<T> = {
	client: any;
	explorer: string;
	extra?: T;
};

export type Hyperverse = {
	blockchain: HyperverseBlockchain<unknown> | null;
	network: Network | NetworkConfig;
	storage?: Storage | ({ name?: Storage; options: { clientUrl: string } } | undefined);
	modules: HyperverseModuleBase[];
	options?: {
		disableProviderAutoInit?: boolean;
	};
};

export type HyperverseConfig = {
	network: NetworkConfig;
	storage?: SkynetStorageLibrary,
} & Omit<Hyperverse, 'network' | 'storage'>;

export type HyperverseModuleBase = {
	bundle: {
		ModuleName?: string;
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
};

export type EvmEnvironment = {
	[key in BlockchainEvm]?: {
		[key in Network]: {
			[key: string]: any;
			contractAddress: string | null;
			factoryAddress: string | null;
		} | {};
	};
};
