import { GetTotalSupply } from './getTotalSupply';
import { HyperverseProvider } from './utils/Provider';
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

const Template = (args) => (
	<HyperverseProvider>
		<GetTotalSupply {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenantId: ''
};