import { GetTotalTenants } from './getTotalTenants';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTotalTenants.mdx';

export default {
	title: 'Components/GetTotalTenants',
	component: GetTotalTenants,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTotalTenants {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenants: 3
};
