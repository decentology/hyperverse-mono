import React from 'react';
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Localhost, Evm } from '@decentology/hyperverse-evm';
import * as Tribes from '../../source';
import { hexlify } from 'ethers/lib/utils';

export const HyperverseProvider = ({ children }) => {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: {
			type: Network.Testnet,
			chainId: 1337,
			name: 'localhost',
			networkUrl: 'http://localhost:6006/hyperchain',
		},
		modules: [{ bundle: Tribes, tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f' }],
	});
	return <Provider initialState={hyperverse}>{children}</Provider>;
};
