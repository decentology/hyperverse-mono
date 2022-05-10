import { GetTotalSupply } from './getTotalSupply';
import React from 'react';
import { Doc } from '../docs/getTotalSupply.mdx';

export default {
	title: 'Components/GetTotalSupply',
	component: GetTotalSupply,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <GetTotalSupply {...args} />;

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '',
};
