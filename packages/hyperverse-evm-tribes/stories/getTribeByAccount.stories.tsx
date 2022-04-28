import { GetTribeByAccount } from './getTribeByAccount';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTribeByAccount.mdx';

export default {
	title: 'Components/GetTribeByAccount',
	component: GetTribeByAccount,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribeByAccount {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
