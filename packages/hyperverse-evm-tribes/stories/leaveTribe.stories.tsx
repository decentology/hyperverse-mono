import React from 'react';
import { LeaveTribe } from './leaveTribe';
import { HyperverseProvider } from './utils/Provider';
import { Doc } from '../docs/leaveTribe.mdx';

export default {
	title: 'Components/LeaveTribe',
	component: LeaveTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<LeaveTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
