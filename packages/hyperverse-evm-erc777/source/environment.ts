import {
	Network,
	Blockchain,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
	useHyperverse,
} from '@decentology/hyperverse';
import ERC777Factory from '../artifacts/contracts/ERC777Factory.sol/ERC777Factory.json';
import ERC777 from '../artifacts/contracts/ERC777.sol/ERC777.json';
export const ContractABI = ERC777.abi;
export const FactoryABI = ERC777Factory.abi;
import Contracts from '../contracts.json';

const environment = Contracts as EvmEnvironment;


function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (!isEvm(blockchain?.name)) {
		throw new Error('Blockchain is not EVM compatible');
	}

	const env = environment[blockchain.name as BlockchainEvm]
	if (!env) {
		throw new Error('Blockchain not found');
	}
	return {
		...env[network.type],
		ContractABI,
		FactoryABI,
	};
}

export { environment, useEnvironment };
