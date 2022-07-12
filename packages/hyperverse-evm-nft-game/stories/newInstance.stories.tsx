import React from 'react';
import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/newInstance.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof NewInstance>;

export const Demo: ComponentStoryFn<typeof NewInstance> = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);
