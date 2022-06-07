import { IsOperatorFor } from './isOperatorFor';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/isOperatorFor.mdx';

export default {
	title: 'Components/IsOperatorFor',
	component: IsOperatorFor,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<IsOperatorFor {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenHolder: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
};