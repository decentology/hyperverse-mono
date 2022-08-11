import { initialize, Network, Provider } from '@decentology/hyperverse/react';
import { Localhost } from '@decentology/hyperverse-evm/react';
import React, { FC } from 'react';
import * as SmartModule from '../../source/react';
import '@decentology/hyperverse-evm/styles.css'

export const HyperverseProvider: FC<any> = ({ children }) => {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: {
			type: Network.Testnet,
			chainId: 31337,
			name: 'localhost',
			networkUrl: 'http://localhost:6006/hyperchain'
		},
		modules: [{ bundle: SmartModule, tenantId: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }]
	});
	return <Provider initialState={hyperverse}>{children}</Provider>;
};
