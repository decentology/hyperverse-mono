import { Register } from './createWhitelist';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/register.mdx';

export default {
	title: 'Components/Register',
	component: Register,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Register {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
