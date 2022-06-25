import {
	isEvm,
	Blockchain,
	BlockchainEvm,
	EvmEnvironment,
	NetworkConfig,
} from '@decentology/hyperverse';

import Contracts from '../contracts.json';
import { ContractInterface } from 'ethers';
import NFTGame1FactoryABI from '../artifacts/contracts/NFTGame1Factory.sol/NFTGame1Factory.json';
import NFTGame1ABI from '../artifacts/contracts/NFTGame1.sol/NFTGame1.json';

export const FactoryABI = NFTGame1FactoryABI.abi as ContractInterface;
export const ContractABI = NFTGame1ABI.abi as ContractInterface;

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
