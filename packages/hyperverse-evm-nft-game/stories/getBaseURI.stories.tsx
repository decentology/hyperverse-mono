import React from 'react';
import { GetBaseURI } from './getBaseURI';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getBaseURI.mdx';

export default {
	title: 'Components/GetBaseURI',
	component: GetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetBaseURI>;

const Template: ComponentStoryFn<typeof GetBaseURI>= (args: any) => (
	<HyperverseProvider>
		<GetBaseURI {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
