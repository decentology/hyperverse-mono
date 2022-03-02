import {
	networks,
	useHyperverse,
	blockchains,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
} from '@decentology/hyperverse';
import ERC721FactoryABI from '../utils/ExampleNFTFactory.json';
import ERC721ABI from '../utils/ExampleNFT.json';

export const FactoryABI = ERC721FactoryABI.abi;
export const ABI = ERC721ABI.abi;

const environment: EvmEnvironment = {
	[blockchains.Ethereum]: {
		[networks.Mainnet]: {
			contractAddress: null,
			tenantAddress: '',
		},
		[networks.Testnet]: {
			contractAddress: '0xe5d761311212ABF55c9C6eb6d80eAF804F213d72',
			tenantAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
		},
	},
	[blockchains.Metis]: {
		[networks.Mainnet]: {
			contractAddress: null,
			tenantAddress: '',
		},
		[networks.Testnet]: {
			contractAddress: 'x07F3062D51C9A6CA568C8135656054FA88D5b646',
			tenantAddress: '0x8f8B8BE836fbe857c65E892dBb261F249f9b0adb',
		},
	},
	[blockchains.Avalanche]: {
		[networks.Mainnet]: {
			contractAddress: null,
			tenantAddress: '',
		},
		[networks.Testnet]: {
			contractAddress: '',
			tenantAddress: '',
		},
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
	const env = environment[blockchain.name as BlockchainEvm][network];
	return {
		...env,
		ABI,
		FactoryABI,
	};
}

export { environment, useEnvironment };
