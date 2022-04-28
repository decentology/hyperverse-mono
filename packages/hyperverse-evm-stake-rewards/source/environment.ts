import {
	Network,
	Blockchain,
	isEvm,
	BlockchainEvm,
	EvmEnvironment,
	useHyperverse,
} from '@decentology/hyperverse';
import StakeFactory from '../artifacts/contracts/StakeRewardsFactory.sol/StakeRewardsFactory.json';
import Stake from '../artifacts/contracts/StakeRewardsToken.sol/StakeRewardsToken.json';
export const ContractABI = Stake.abi;
export const FactoryABI = StakeFactory.abi;
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

	const env = environment[blockchain.name as BlockchainEvm]
	if(!env) {
		throw new Error('Blockchain not found');
	}
	return {
		...env[network.type],
		ContractABI,
		FactoryABI,
	};
}

export { environment, useEnvironment };
