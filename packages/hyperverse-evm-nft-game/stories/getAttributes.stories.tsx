import { GetAttributes } from './getAttributes';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getAttributes.mdx';

export default {
	title: 'Components/GetAttributes',
	component: GetAttributes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetAttributes {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};