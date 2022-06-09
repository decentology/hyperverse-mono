import { Whitelist } from './whitelist';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/whitelist.mdx';

export default {
	title: 'Components/Whitelist',
	component: Whitelist,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Whitelist {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
