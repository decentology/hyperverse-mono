import {
	Network,
	Blockchain,
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
} from '@decentology/hyperverse';
import RandomPick from '../artifacts/contracts/RandomPick.sol/RandomPick.json';
import Contracts from '../contracts.json';
export const ContractABI = RandomPick.abi;

const environment = Contracts as EvmEnvironment;

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (blockchain?.name !== Blockchain.Ethereum && blockchain?.name !== Blockchain.Polygon) {
		throw new Error('Blockchain is not EVM compatible');
	}

	const env = environment[blockchain.name as BlockchainEvm][network.type];
	return {
		...env,
		ContractABI,
	};
}

export { environment, useEnvironment };
