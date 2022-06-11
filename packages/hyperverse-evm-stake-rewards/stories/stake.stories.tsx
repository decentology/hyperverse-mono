import { StakeTokens } from './stake';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/stake.mdx';

export default {
	title: 'Components/StakeTokens',
	component: StakeTokens,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<StakeTokens {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	amount: 10000,
};
