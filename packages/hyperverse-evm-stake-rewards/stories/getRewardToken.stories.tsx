import { GetRewardToken } from './getRewardToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getRewardToken.mdx';

export default {
	title: 'Components/GetRewardToken',
	component: GetRewardToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetRewardToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};