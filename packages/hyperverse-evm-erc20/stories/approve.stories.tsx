import { Approve } from './approve';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/approve.mdx';

export default {
	title: 'Components/Approve',
	component: Approve,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Approve {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	owner: '',
	amount: 10,
};