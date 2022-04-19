import {
	isEvm,
	Blockchain,
	BlockchainEvm,
	useHyperverse,
	EvmEnvironment,
} from '@decentology/hyperverse';
import Whitelist from '../artifacts/contracts/Whitelist.sol/Whitelist.json';
import WhitelistFactory from '../artifacts/contracts/WhitelistFactory.sol/WhitelistFactory.json';
import Contracts from '../contracts.json';
import { ContractInterface } from 'ethers';
export const ContractABI = Whitelist.abi as ContractInterface;
export const FactoryABI = WhitelistFactory.abi as ContractInterface;

const environment = Contracts as EvmEnvironment;

function getEnvironment(blockchainName: Blockchain, network: NetworkConfig) {
	if (blockchainName == null) {
		throw new Error('Blockchain is not set');
	}
	if (!isEvm(blockchainName)) {
		throw new Error('Blockchain is not EVM compatible');
	}

	const chain = environment[blockchainName as BlockchainEvm];
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

export { environment, getEnvironment };
