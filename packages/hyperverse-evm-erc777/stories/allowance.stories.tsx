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
	owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	spender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
