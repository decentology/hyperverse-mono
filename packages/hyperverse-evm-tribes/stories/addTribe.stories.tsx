import React from 'react';
import { AddTribe } from './addTribe';
import { HyperverseProvider } from './utils/Provider';
import { Doc } from '../docs/addTribe.mdx';

export default {
	title: 'Components/AddTribe',
	component: AddTribe,
	argTypes: {
		image: { control: { type: 'file', accept: '.png' } },
		name: { control: { type: 'text' } },
		description: { control: { type: 'text' } },
	},
	parameters: {
		layout: 'fullscreen',
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AddTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
