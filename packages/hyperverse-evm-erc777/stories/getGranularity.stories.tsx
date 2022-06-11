import { GetGranularity } from './getGranularity';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getGranularity.mdx';

export default {
	title: 'Components/GetGranularity',
	component: GetGranularity,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetGranularity {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
