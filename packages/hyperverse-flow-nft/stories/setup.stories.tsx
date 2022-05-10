import { Setup } from './setup';
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

const Template = (args) => <Setup {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
