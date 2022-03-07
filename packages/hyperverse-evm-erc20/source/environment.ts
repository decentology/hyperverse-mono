import {
	Network,
	Blockchain,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
	useHyperverse
} from '@decentology/hyperverse';
import ERC20Factory from '../artifacts/contracts/ERC20Factory.sol/ERC20Factory.json';
import ERC20 from '../artifacts/contracts/ERC20.sol/ERC20.json';
export const ContractABI = ERC20.abi;
export const FactoryABI = ERC20Factory.abi;
const environment: EvmEnvironment = {
	[Blockchain.Ethereum]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null
		},
		[Network.Testnet]: {
			contractAddress: '0x5075a0259b418fbD46211B81AfA766157e7DD135',
			factoryAddress: '0x4330f8f04490d09852e6916777e15259dF195F6A',
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
