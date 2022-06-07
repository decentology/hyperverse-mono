import { Send } from './send';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/send.mdx';

export default {
	title: 'Components/Send',
	component: Send,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Send {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 125,
	data: '',
};
