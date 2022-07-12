import { GetOwnerOf } from './getOwnerOf';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getOwnerOf.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/GetOwnerOf',
	component: GetOwnerOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetOwnerOf>;

const Template: ComponentStoryFn<typeof GetOwnerOf>= (args) => (
	<HyperverseProvider>
		<GetOwnerOf {...args} />
	</HyperverseProvider>
);

export const Token1 = Template.bind({});

Token1.args = {
	tokenId: '1',
};

export const Token2 = Template.bind({});

Token2.args = {
	tokenId: '2',
};
