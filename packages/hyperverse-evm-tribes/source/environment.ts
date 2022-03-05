import {
	Network,
	Blockchain,
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment
} from '@decentology/hyperverse';
import TribesFactory from '../artifacts/contracts/TribesFactory.sol/TribesFactory.json';
import Tribes from '../artifacts/contracts/Tribes.sol/Tribes.json';
export const ContractABI = Tribes.abi;
export const FactoryABI = TribesFactory.abi;
const environment: EvmEnvironment = {
	[Blockchain.Ethereum]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null,
			tenantAddress: null
		},
		[Network.Testnet]: {
			contractAddress: '0x995d701c0CaAeDA88DBF21727202F3a61AF01177',
			factoryAddress: '0xACec20ad889Ba58Ec9d65AB0aA7C0e0D151222e0',
			tenantAddress: '0xDf61226090C2475D9ec7c494684d2715b61F130c'
		}
	},
	[Blockchain.Metis]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null,
			tenantAddress: null
		},
		[Network.Testnet]: {
			contractAddress: '',
			factoryAddress: '',
			tenantAddress: ''
		}
	},
	[Blockchain.Avalanche]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null,
			tenantAddress: null
		},
		[Network.Testnet]: {
			contractAddress: '',
			factoryAddress: '',
			tenantAddress: ''
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
