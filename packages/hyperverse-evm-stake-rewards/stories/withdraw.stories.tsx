import { Withdraw } from './withdraw';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/withdraw.mdx';

export default {
	title: 'Components/Withdraw',
	component: Withdraw,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Withdraw {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	amount: 10,
};
