import { DeleteWhitelist } from './deleteWhitelist';
import React from 'react';
import { Doc } from '../docs/deleteWhitelist.mdx';

export default {
	title: 'Components/DeleteWhitelist',
	component: DeleteWhitelist,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <DeleteWhitelist {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
