enum Blockchain {
	Algorand = 'algorand',
	Flow = 'flow',
	Ethereum = 'ethereum',
	Metis = 'metis',
	Avalanche = 'avalanche',
	Polygon = 'polygon'
}

export default Blockchain;
export const BlockchainList: string[] = Object.values(Blockchain).filter(
	(v) => typeof v === 'string'
);
