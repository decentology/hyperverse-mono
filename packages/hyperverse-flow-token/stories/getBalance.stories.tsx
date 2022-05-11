import { GetBalance } from './getBalance';
import React from 'react';
import { Doc } from '../docs/getBalance.mdx';

export default {
	title: 'Components/GetBalance',
	component: GetBalance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <GetBalance {...args} />;

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
    account: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f'
};
