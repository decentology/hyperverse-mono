import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Localhost } from '@decentology/hyperverse-evm';
import { FC } from 'react';
import * as ERC721 from '../../source';

export const HyperverseProvider: FC<{}> = ({ children }) => {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: {
			type: Network.Testnet,
			chainId: 1337,
			name: 'localhost',
			networkUrl: 'http://localhost:6006/hyperchain',
		},
		modules: [{ bundle: ERC721, tenantId: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' }],
	});
	return <Provider initialState={hyperverse}>{children}</Provider>;
};
