import { Send } from './send';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/send.mdx';

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
	sender: '',
    recipient: '',
    value: null,
    data: '',
    operatorData: ''
};