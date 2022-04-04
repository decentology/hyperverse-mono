import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/newInstance.mdx';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} onClick={() => console.log('You created a new instance')}/>
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: null,
};
