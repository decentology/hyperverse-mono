import { Mint } from './mint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/mint.mdx';

export default {
	title: 'Components/Mint',
	component: Mint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Mint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
};
