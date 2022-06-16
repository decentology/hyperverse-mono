import { GetDecimals } from './getDecimals';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getDecimals.mdx';

export default {
	title: 'Components/GetDecimals',
	component: GetDecimals,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetDecimals {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};