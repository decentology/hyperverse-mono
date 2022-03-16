import {
	Network,
	useHyperverse,
	isEvm,
	EvmEnvironment,
} from '@decentology/hyperverse';
import ERC721FactoryABI from '../artifacts/contracts/NFTFactory.sol/NFTFactory.json';
import ERC721ABI from '../artifacts/contracts/NFT.sol/NFT.json';
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
	const env = environment[blockchain.name as BlockchainEvm][network.type];
	return {
		...env,
		ContractABI,
		FactoryABI,
	};
}

export { environment, useEnvironment };
