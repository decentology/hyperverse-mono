import { networks, useHyperverse } from '@decentology/hyperverse';

const environment = {
	[networks.Mainnet]: {
		appID: null,
	},
	[networks.Testnet]: {
		tokenAddress: '0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352',
		factoryAddress: '0x9355320b627Bf3dBb4315886ff85e845f04Db6a9'
	},
};

function useEnvironment() {
	const {network} = useHyperverse();
	return network === networks.Mainnet
		? environment[networks.Mainnet]
		: environment[networks.Testnet];
}

export { environment, useEnvironment };
