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
	sender: '',
    recipient: '',
    value: null,
    data: '',
    operatorData: ''
};