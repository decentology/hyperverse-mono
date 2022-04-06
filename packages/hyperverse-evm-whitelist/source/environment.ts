import {
	Network,
	Blockchain,
	useHyperverse,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
} from '@decentology/hyperverse';
import Whitelist from '../artifacts/contracts/Whitelist.sol/Whitelist.json';
import WhitelistFactory from '../artifacts/contracts/WhitelistFactory.sol/WhitelistFactory.json';
import Contracts from '../contracts.json';
export const ContractABI = Whitelist.abi;
export const FactoryABI = WhitelistFactory.abi;

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
