import React from 'react';
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { GetTribeId } from './getTribeId';
import { Ethereum, Evm } from '@decentology/hyperverse-evm';
import * as Tribes from '../source';

const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [{ bundle: Tribes, tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f' }],
	options: {
		disableProviderAutoInit: true,
	},
});

export default {
	title: 'Example/GetTribeId',
	component: GetTribeId,
};

const Template = (args) => (
	<Provider initialState={hyperverse}>
		<Evm.Provider
			initialState={{
				networks: {
					testnet: {
						networkUrl: 'http://localhost:6006/hyperchain',
						chainId: 4,
						type: Network.Testnet,
						name: 'localhost',
					},
				},
			}}
		>
			<GetTribeId {...args} />
		</Evm.Provider>
	</Provider>
);

export const Account = Template.bind({});
Account.args = {
	account: null,
};
