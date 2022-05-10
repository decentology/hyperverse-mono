import { CreateWhitelist } from './createWhitelist';
import React from 'react';
import { Doc } from '../docs/createWhitelist.mdx';

export default {
	title: 'Components/CreateWhitelist',
	component: CreateWhitelist,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <CreateWhitelist {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
