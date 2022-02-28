import { networks, useHyperverse } from '@decentology/hyperverse';
import { TOKEN_FACTORY_ADDRESS, TOKEN_MAIN_ADDRESS } from '@decentology/hyperverse-ethereum-token/source/constants';

const environment = {
	[networks.Mainnet]: {
		appID: null,
	},
	[networks.Testnet]: {
		tokenAddress: TOKEN_MAIN_ADDRESS,
		factoryAddress: TOKEN_FACTORY_ADDRESS
	},
};

function useEnvironment() {
	const {network} = useHyperverse();
	return network === networks.Mainnet
		? environment[networks.Mainnet]
		: environment[networks.Testnet];
}

export { environment, useEnvironment };
