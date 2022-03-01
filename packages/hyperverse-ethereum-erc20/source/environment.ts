import { networks, useHyperverse } from '@decentology/hyperverse';

const environment = {
	[networks.Mainnet]: {
		appID: null,
	},
	[networks.Testnet]: {
		erc20Address: '0x5075a0259b418fbD46211B81AfA766157e7DD135',
		erc20FactoryAddress: '0x4330f8f04490d09852e6916777e15259dF195F6A'
	},
};

function useEnvironment() {
	const {network} = useHyperverse();
	return network === networks.Mainnet
		? environment[networks.Mainnet]
		: environment[networks.Testnet];
}

export { environment, useEnvironment };
