import React from 'react';
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Localhost, Evm } from '@decentology/hyperverse-evm';
import * as Tribes from '../../source';
import { hexlify } from 'ethers/lib/utils';

export const HyperverseProvider = ({ children }) => {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: Network.Testnet,
		modules: [{ bundle: Tribes, tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f' }],
		// modules: [],
		options: {
			disableProviderAutoInit: true,
		},
	});
	return (
		<Provider initialState={hyperverse}>
			<Evm.Provider
				initialState={{
					networks: {
						testnet: {
							networkUrl: 'http://localhost:6006/hyperchain',
							chainId: hexlify(1337),
							type: Network.Testnet,
							name: 'localhost',
						},
					},
				}}
			>
				<Tribes.Provider tenantId={hyperverse.modules[0].tenantId}>
				{children}

				</Tribes.Provider>
			</Evm.Provider>
		</Provider>
	);
};
