import {
	useHyperverse,
	isEvm,
	EvmEnvironment,
	BlockchainEvm,
} from '@decentology/hyperverse';
import ERC721FactoryABI from '../artifacts/contracts/ERC721Factory.sol/ERC721Factory.json';
import ERC721ABI from '../artifacts/contracts/ERC721.sol/ERC721.json';
import Contracts from '../contracts.json';
export const FactoryABI = ERC721FactoryABI.abi;
export const ContractABI = ERC721ABI.abi;
const environment = Contracts as EvmEnvironment;

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (!isEvm(blockchain?.name)) {
		throw new Error('Blockchain is not EVM compatible');
	}
	const chain = environment[blockchain.name as BlockchainEvm];
	if (!chain) {
		throw new Error('Blockchain is not supported');
	}
	const env = chain[network.type];
	return {
		...env,
		ContractABI,
		FactoryABI
	};
}

export { environment, useEnvironment };
