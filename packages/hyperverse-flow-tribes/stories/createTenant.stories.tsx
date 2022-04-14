import { CreateTenant } from './createTenant';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/createTenant.mdx';

export default {
	title: 'Components/NewInstance',
	component: CreateTenant,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<CreateTenant {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
};
