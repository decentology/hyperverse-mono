import { AddTribe } from './addTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/addTribe.mdx';

export default {
	title: 'Components/AddTribe',
	component: AddTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AddTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	newTribeName: '',
    ipfsHash: '',
    description: ''
};