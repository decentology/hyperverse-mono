import React from 'react';
import { AddTribe } from './addTribe';
import { HyperverseProvider } from './utils/Provider';

export default {
	title: 'Components/AddTribe',
	component: AddTribe,
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
