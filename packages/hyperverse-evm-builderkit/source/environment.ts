import {
	isEvm,
	Blockchain,
	BlockchainEvm,
	EvmEnvironment,
	NetworkConfig,
} from '@decentology/hyperverse';
import Factory from '../artifacts/contracts/ModuleFactory.sol/ModuleFactory.json';
import Contract from '../artifacts/contracts/Module.sol/Module.json';
import Contracts from '../contracts.json';

import { ContractInterface } from 'ethers';
export const ContractABI = Contract.abi as ContractInterface;
export const FactoryABI = Factory.abi as ContractInterface;

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
