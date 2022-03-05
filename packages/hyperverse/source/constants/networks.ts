enum Network {
	Mainnet = 'mainnet',
	Testnet = 'testnet',
}

export type NetworkConfig = {
	type: Network,
	networkUrl: string;
	name?: string;
	chainId?: number;
	explorerUrl?: string;

}

export default Network;
export const NetworkList: string[] = Object.values(Network).filter((v) => typeof v === 'string');
