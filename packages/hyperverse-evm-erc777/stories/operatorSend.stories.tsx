import { OperatorSend } from './operatorSend';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/operatorSend.mdx';

export default {
	title: 'Components/OperatorSend',
	component: OperatorSend,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<OperatorSend {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	sender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	recipient: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
	amount: 25,
	data: '',
	operatorData: '',
};
