export enum Network {
	Mainnet = 'mainnet',
	Testnet = 'testnet',
}

export type NetworkConfig = {
	type: Network,
	name?: string;
	label?: string;
	networkUrl?: string;
	chainId?: number;
	blockExplorer?: string;
	providerId?: string;
	[key: string]: any;

}

export const NetworkList: string[] = Object.values(Network).filter((v) => typeof v === 'string');
