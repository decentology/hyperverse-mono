import { TransferToken } from './transferToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/mintToken.mdx';

export default {
	title: 'Components/TransferToken',
	component: TransferToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TransferToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    tenantId: '',
	recipient: '',
    amount: ''
};