enum Network {
	Mainnet = 'mainnet',
	Testnet = 'testnet',
}
export default Network;
export const NetworkList: string[] = Object.values(Network).filter((v) => typeof v === 'string');
