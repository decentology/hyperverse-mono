import { Network, isEvm, EvmEnvironment, useHyperverse } from '@decentology/hyperverse';
export const ContractABI = '';
export const FactoryABI = '';
const environment: EvmEnvironment = {
	[Network.Mainnet]: {
		contractAddress: null,
		factoryAddress: null,
	},
	[Network.Testnet]: {
		contractAddress: null,
		factoryAddress: null,
	},
};

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (!isEvm(blockchain?.name)) {
		throw new Error('Blockchain is not EVM compatible');
	}

	const env = environment[network.type];
	return {
		...env,
		ContractABI,
		FactoryABI,
	};
}

export { environment, useEnvironment };
