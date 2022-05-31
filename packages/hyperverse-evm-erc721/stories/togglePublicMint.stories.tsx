import { TogglePublicMint } from './togglePublicMint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/togglePublicMint.mdx';

export default {
	title: 'Components/TogglePublicMint',
	component: TogglePublicMint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TogglePublicMint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
