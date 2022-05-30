import { IsOperatorFor } from './isOperatorFor';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/isOperatorFor.mdx';

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

Demo.args = {};