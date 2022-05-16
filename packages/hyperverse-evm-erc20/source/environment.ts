import {
	isEvm,
	Blockchain,
	BlockchainEvm,
	EvmEnvironment,
	NetworkConfig,
} from '@decentology/hyperverse';
import { ContractInterface } from 'ethers';
import Contracts from '../contracts.json';

import ERC20Factory from '../artifacts/contracts/ERC20Factory.sol/ERC20Factory.json';
import ERC20 from '../artifacts/contracts/ERC20.sol/ERC20.json';

export const ContractABI = ERC20.abi as ContractInterface;
export const FactoryABI = ERC20Factory.abi as ContractInterface;

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
