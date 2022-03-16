import {
	Network,
	Blockchain,
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
} from '@decentology/hyperverse';
import TribesFactory from '../artifacts/contracts/TribesFactory.sol/TribesFactory.json';
import Tribes from '../artifacts/contracts/Tribes.sol/Tribes.json';
import Contracts from '../contracts.json';
export const ContractABI = Tribes.abi;
export const FactoryABI = TribesFactory.abi;

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
