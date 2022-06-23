import { initialize, Network, NetworkConfig, Provider } from '@decentology/hyperverse';
import { Localhost, Ethereum } from '@decentology/hyperverse-evm';
import { FC, VFC } from 'react';
import * as ERC20 from '../../source';

export const HyperverseProvider: FC<{}> = ({ children }) => {
	const hyperverse = initialize({
		blockchain: process.env.STORYBOOK_NETWORK === 'rinkeby' ? Ethereum : Localhost,
		network:
			process.env.STORYBOOK_NETWORK === 'rinkeby'
				? {
						type: Network.Testnet,
						name: 'rinkeby',
						chainId: 4,
						networkUrl: `https://rinkeby.infura.io/v3/fb9f66bab7574d70b281f62e19c27d49`,
						providerId: 'fb9f66bab7574d70b281f62e19c27d49',
						blockExplorer: 'https://rinkeby.etherscan.io',
				  }
				: {
						type: Network.Testnet,
						chainId: 31337,
						name: 'localhost',
						networkUrl: 'http://localhost:6006/hyperchain',
				  },
		modules: [
			{
				bundle: ERC20,
				tenantId:
					process.env.STORYBOOK_NETWORK === 'rinkeby'
						? '0x62a7aa79a52591Ccc62B71729329A80a666fA50f'
						: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
			},
		],
	});
	return <Provider initialState={hyperverse}>{children}</Provider>;
};
