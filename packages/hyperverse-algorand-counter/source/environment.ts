import { Network, useHyperverse } from '@decentology/hyperverse';

const environment = {
	[Network.Mainnet]: {
		appID: 448458617
	},
	[Network.Testnet]: {
		appID: 45445115
	}
};

function useEnvironment() {
	const hyperverse = useHyperverse();
	return hyperverse.network.type == Network.Testnet
		? environment[Network.Testnet]
		: environment[Network.Mainnet];
}

export { environment, useEnvironment };
