export enum Blockchain {
	Algorand = 'algorand',
	Flow = 'flow',
	Ethereum = 'ethereum',
	Metis = 'metis',
	Avalanche = 'avalanche',
	Polygon = 'polygon'
}

export type BlockchainEvm = Blockchain.Ethereum | Blockchain.Metis | Blockchain.Avalanche | Blockchain.Polygon;

export const EVM: Record<BlockchainEvm, string> = {
	[Blockchain.Ethereum]: Blockchain.Ethereum,
	[Blockchain.Avalanche]: Blockchain.Avalanche,
	[Blockchain.Metis]: Blockchain.Metis,
	[Blockchain.Polygon]: Blockchain.Polygon
}

export function isEvm(blockchain: Blockchain | Exclude<Blockchain, BlockchainEvm>): blockchain is Blockchain {
	return !!EVM[blockchain as BlockchainEvm]
}

export const BlockchainList: string[] = Object.values(Blockchain).filter(
	(v) => typeof v === 'string'
);
