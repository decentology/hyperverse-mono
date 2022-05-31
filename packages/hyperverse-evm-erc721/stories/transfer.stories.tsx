import { Transfer } from './transfer';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/transfer.mdx';

export default {
	title: 'Components/Transfer',
	component: Transfer,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Transfer {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	from: '',
	to: '',
	tokenId: 1,
};
