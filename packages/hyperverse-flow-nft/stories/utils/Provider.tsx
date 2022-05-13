import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Flow } from '@decentology/hyperverse-flow';
import { FC, VFC } from 'react';
import * as Tribes from '../../source';

export const HyperverseProvider: FC<{}> = ({ children }) => {
	const hyperverse = initialize({
		blockchain: Flow,
		network: {
			type: Network.Testnet,
			chainId: 1337,
			name: 'localhost',
			networkUrl: 'http://localhost:6006/hyperchain'
		},
		modules: [{ bundle: Tribes, tenantId: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }]
	});
	return <Provider initialState={hyperverse}>{children}</Provider>;
};
