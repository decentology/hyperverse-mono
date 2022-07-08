import { GetTokenSymbol } from './getTokenSymbol';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTokenSymbol.mdx';

export default {
	title: 'Components/GetTokenSymbol',
	component: GetTokenSymbol,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTokenSymbol {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};