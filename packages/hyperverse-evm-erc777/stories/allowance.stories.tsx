import { Allowance } from './allowance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/allowance.mdx';

export default {
	title: 'Components/Allowance',
	component: Allowance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Allowance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	owner: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	spender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
