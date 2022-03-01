import { networks, useHyperverse } from '@decentology/hyperverse';

const environment = {
	[networks.Mainnet]: {
		appID: null,
	},
	[networks.Testnet]: {
		erc20Address: '0x97DECc530f9ff4798Bfdc4f766AA0Ec428145B08',
		erc20FactoryAddress: '0x898ee1817b534C64f768D9832D3ddAd8aA353222'
	},
};

function useEnvironment() {
	const {network} = useHyperverse();
	return network === networks.Mainnet
		? environment[networks.Mainnet]
		: environment[networks.Testnet];
}

export { environment, useEnvironment };
