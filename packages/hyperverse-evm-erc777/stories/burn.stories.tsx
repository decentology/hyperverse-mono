import { Burn } from './burn';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/burn.mdx';

export default {
	title: 'Components/Burn',
	component: Burn,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Burn {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
