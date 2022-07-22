import { TogglePublicMint } from './togglePublicMint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/togglePublicMint.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/TogglePublicMint',
	component: TogglePublicMint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof TogglePublicMint>;

export const Demo: ComponentStoryFn<typeof TogglePublicMint> = (args) => (
	<HyperverseProvider>
		<TogglePublicMint {...args} />
	</HyperverseProvider>
);
