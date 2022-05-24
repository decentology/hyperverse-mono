import { ClaimReward } from './claimReward';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/claimReward.mdx';

export default {
	title: 'Components/ClaimReward',
	component: ClaimReward,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<ClaimReward {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};