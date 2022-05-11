import { TransferToken } from './transferToken';
import React from 'react';
import { Doc } from '../docs/transferToken.mdx';

export default {
	title: 'Components/TransferToken',
	component: TransferToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <TransferToken {...args} />;

export const Demo = Template.bind({});

Demo.args = {
    tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
	recipient: '', // i need accounts to mess with
    amount: 1000
};
