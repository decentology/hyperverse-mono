import { Register } from './createWhitelist';
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

const Template = (args) => <Register {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
