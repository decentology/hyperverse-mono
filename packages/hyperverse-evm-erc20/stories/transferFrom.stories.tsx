import { TransferFrom } from './transferFrom';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transferFrom.mdx';

export default {
	title: 'Components/TransferFrom',
	component: TransferFrom,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TransferFrom {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	from: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
	amount: 15,
};
