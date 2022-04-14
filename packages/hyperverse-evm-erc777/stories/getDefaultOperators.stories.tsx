import { GetDefaultOperators } from './getDefaultOperators';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getDefaultOperators.mdx';

export default {
	title: 'Components/GetDefaultOperators',
	component: GetDefaultOperators,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetDefaultOperators {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};