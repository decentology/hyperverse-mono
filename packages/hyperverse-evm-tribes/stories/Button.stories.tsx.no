import React from 'react';
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Button } from './Button';
import { Ethereum, Evm } from '@decentology/hyperverse-evm';
import * as Tribes from '../source';
import { HyperverseProvider } from './utils/Provider';

const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [{ bundle: Tribes, tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f' }],
	options: {
		disableProviderAutoInit: true,
	},
});
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Example/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
	<HyperverseProvider>
		<Button {...args} />
	</HyperverseProvider>
);

export const Account = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Account.args = {
	account: null,
};
