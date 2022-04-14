import { GetEarned } from './getEarned';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getEarned.mdx';

export default {
	title: 'Components/GetEarned',
	component: GetEarned,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetEarned {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    account: ''
};