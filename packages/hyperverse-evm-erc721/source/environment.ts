import {
	Network,
	useHyperverse,
	Blockchain,
	isEvm,
	BlockchainEvm,
	EvmEnvironment
} from '@decentology/hyperverse';
import ERC721FactoryABI from '../artifacts/contracts/NFTFactory.sol/NFTFactory.json';
import ERC721ABI from '../artifacts/contracts/NFT.sol/NFT.json';

export const FactoryABI = ERC721FactoryABI.abi;
export const ContractABI = ERC721ABI.abi;

const environment: EvmEnvironment = {
	[Blockchain.Ethereum]: {
		[Network.Mainnet]: {
			contractAddress: null,
			factoryAddress: null,
		},
		[Network.Testnet]: {
			factoryAddress: null,
			contractAddress: '0xe5d761311212ABF55c9C6eb6d80eAF804F213d72',
		}
	},
	[Blockchain.Metis]: {
		[Network.Mainnet]: {
			factoryAddress: null,
			contractAddress: null,
		},
		[Network.Testnet]: {
			factoryAddress: null,
			contractAddress: 'x07F3062D51C9A6CA568C8135656054FA88D5b646',
		}
	},
	[Blockchain.Avalanche]: {
		[Network.Mainnet]: {
			factoryAddress: null,
			contractAddress: null,
		},
		[Network.Testnet]: {
			factoryAddress: null,
			contractAddress: null,
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
