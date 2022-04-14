import { GetTokenName } from './getTokenName';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTokenName.mdx';

export default {
	title: 'Components/GetTokenName',
	component: GetTokenName,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTokenName {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};