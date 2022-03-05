import {
	Network,
	Blockchain,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
	useHyperverse
} from '@decentology/hyperverse';
export const ContractABI = '';
export const FactoryABI = '';
const environment: EvmEnvironment = {
	[Blockchain.Ethereum]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null
		},
		[Network.Testnet]: {
			contractAddress: null,
			factoryAddress: null
		}
	},
	[Blockchain.Metis]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null
		},
		[Network.Testnet]: {
			contractAddress: null,
			factoryAddress: null
		}
	},
	[Blockchain.Avalanche]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null
		},
		[Network.Testnet]: {
			contractAddress: null,
			factoryAddress: null
		}
	}
};

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (!isEvm(blockchain?.name)) {
		throw new Error('Blockchain is not EVM compatible');
	}

	const env = environment[blockchain.name as BlockchainEvm][network.type];
	return {
		...env,
		ContractABI,
		FactoryABI
	};
}

export { environment, useEnvironment };
