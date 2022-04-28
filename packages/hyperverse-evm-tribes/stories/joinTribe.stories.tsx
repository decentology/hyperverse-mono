import { JoinTribe } from './joinTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/joinTribe.mdx';

export default {
	title: 'Components/JoinTribe',
	component: JoinTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<JoinTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    knightId: 1,
    mageId: 2
};
