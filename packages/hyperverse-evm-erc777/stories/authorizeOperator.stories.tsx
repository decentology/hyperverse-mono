import { AuthorizeOperator } from './authorizeOperator';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/authorizeOperator.mdx';

export default {
	title: 'Components/AuthorizeOperator',
	component: AuthorizeOperator,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AuthorizeOperator {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
};
