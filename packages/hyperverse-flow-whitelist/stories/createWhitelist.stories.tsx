import { CreateWhitelist } from './createWhitelist';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/createWhitelist.mdx';

export default {
	title: 'Components/CreateWhitelist',
	component: CreateWhitelist,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<CreateWhitelist {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
