import { GetTribeMembers } from './getTribeMembers';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/tribeMembers.mdx';

export default {
	title: 'Components/GetTribeMembers',
	component: GetTribeMembers,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribeMembers {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});
Demo.args = {
	tribeId: 1
};
