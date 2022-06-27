import { Transfer } from './transfer';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transfer.mdx';

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
	from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};
