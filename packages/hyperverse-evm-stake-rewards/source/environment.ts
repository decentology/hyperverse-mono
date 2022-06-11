import {
	isEvm,
	Blockchain,
	BlockchainEvm,
	EvmEnvironment,
	NetworkConfig,
} from '@decentology/hyperverse';
import { ContractInterface } from 'ethers';
import Contracts from '../contracts.json';

import StakeFactory from '../artifacts/contracts/StakeRewardsFactory.sol/StakeRewardsFactory.json';
import Stake from '../artifacts/contracts/StakeRewardsToken.sol/StakeRewardsToken.json';
export const ContractABI = Stake.abi as ContractInterface;
export const FactoryABI = StakeFactory.abi as ContractInterface;

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
