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
	tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
};
