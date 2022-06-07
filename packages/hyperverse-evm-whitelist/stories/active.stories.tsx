import { Active } from './active';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/active.mdx';

export default {
	title: 'Components/Active',
	component: Active,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Active {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
