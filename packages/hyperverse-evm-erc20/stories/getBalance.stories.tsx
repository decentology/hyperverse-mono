import { GetBalance } from './getBalance';
import { HyperverseProvider } from './utils/Provider';
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

const Template = (args) => (
	<HyperverseProvider>
		<GetBalance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};