import {
	Network,
	Blockchain,
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
} from '@decentology/hyperverse/react';
import RandomPick from '../../artifacts/contracts/RandomPick.sol/RandomPick.json';
import Contracts from '../../contracts.json';
export const ContractABI = RandomPick.abi;

const environment = Contracts as EvmEnvironment;

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (blockchain?.name !== Blockchain.Ethereum) {
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
	};
}

export { environment, useEnvironment };
