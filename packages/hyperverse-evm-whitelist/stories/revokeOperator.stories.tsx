import { RevokeOperator } from './revokeOperator';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/revokeOperator.mdx';

export default {
	title: 'Components/RevokeOperator',
	component: RevokeOperator,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<RevokeOperator {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	operator: ''
};
