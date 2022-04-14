import { GetReward } from './getReward';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getReward.mdx';

export default {
	title: 'Components/GetReward',
	component: GetReward,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetReward {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};