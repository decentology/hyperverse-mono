import {
	isEvm,
	Blockchain,
	BlockchainEvm,
	EvmEnvironment,
	NetworkConfig,
} from '@decentology/hyperverse';

import Contracts from '../contracts.json';
import { ContractInterface } from 'ethers';
import NFTGameFactoryABI from '../artifacts/contracts/NFTGameFactory.sol/NFTGameFactory.json';
import NFTGameABI from '../artifacts/contracts/NFTGame.sol/NFTGame.json';

export const FactoryABI = NFTGameFactoryABI.abi as ContractInterface;
export const ContractABI = NFTGameABI.abi as ContractInterface;

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
