import {
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
	NetworkConfig
} from '@decentology/hyperverse';
import TribesFactory from '../artifacts/contracts/TribesFactory.sol/TribesFactory.json';
import Tribes from '../artifacts/contracts/Tribes.sol/Tribes.json';
import Contracts from '../contracts.json';
import { HyperverseBlockchain } from '@decentology/hyperverse/source';
export const ContractABI = Tribes.abi;
export const FactoryABI = TribesFactory.abi;

const environment = Contracts as EvmEnvironment;

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	return getEnvironment(blockchain, network);
}

function getEnvironment(blockchain: HyperverseBlockchain<unknown> | null, network: NetworkConfig) {
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
		FactoryABI,
	};
}

export { environment, useEnvironment, getEnvironment };
