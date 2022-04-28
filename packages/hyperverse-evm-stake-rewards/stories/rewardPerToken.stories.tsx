import { RewardPerToken } from './rewardPerToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/rewardPerToken.mdx';

export default {
	title: 'Components/RewardPerToken',
	component: RewardPerToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<RewardPerToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
