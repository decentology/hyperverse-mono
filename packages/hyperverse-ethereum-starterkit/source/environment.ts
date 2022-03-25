import {
	Network,
	Blockchain,
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
} from '@decentology/hyperverse';
import Factory from '../artifacts/contracts/ModuleFactory.sol/ModuleFactory.json';
import Contract from '../artifacts/contracts/Module.sol/Module.json';
import Contracts from '../contracts.json';
export const ContractABI = Contract.abi;
export const FactoryABI = Factory.abi;

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
		FactoryABI,
	};
}

export { environment, useEnvironment };
