import { IsWhitelisted } from './isWhitelisted';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/isWhitelisted.mdx';

export default {
	title: 'Components/IsWhitelisted',
	component: IsWhitelisted,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<IsWhitelisted {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: ''
};
