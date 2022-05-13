import { DeleteWhitelist } from './deleteWhitelist';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/deleteWhitelist.mdx';

export default {
	title: 'Components/DeleteWhitelist',
	component: DeleteWhitelist,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<DeleteWhitelist {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
