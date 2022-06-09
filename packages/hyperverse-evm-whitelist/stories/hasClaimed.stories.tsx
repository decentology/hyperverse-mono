import { HasClaimed } from './hasClaimed';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/hasClaimed.mdx';

export default {
	title: 'Components/HasClaimed',
	component: HasClaimed,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<HasClaimed {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: ''
};
