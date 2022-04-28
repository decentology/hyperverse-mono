import { Setup } from './setup';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setup.mdx';

export default {
	title: 'Components/Setup',
	component: Setup,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Setup {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
