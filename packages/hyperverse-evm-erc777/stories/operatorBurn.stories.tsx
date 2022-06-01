import { OperatorBurn } from './operatorBurn';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/operatorBurn.mdx';

export default {
	title: 'Components/OperatorBurn',
	component: OperatorBurn,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<OperatorBurn {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: '',
	amount: 10000,
	data: '',
	operatorData: ''
};