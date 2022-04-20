import {
	Network,
	Blockchain,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
	useHyperverse,
} from '@decentology/hyperverse';
import ERC20Factory from '../artifacts/contracts/ERC20Factory.sol/ERC20Factory.json';
import ERC20 from '../artifacts/contracts/ERC20.sol/ERC20.json';
export const ContractABI = ERC20.abi;
export const FactoryABI = ERC20Factory.abi;
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
