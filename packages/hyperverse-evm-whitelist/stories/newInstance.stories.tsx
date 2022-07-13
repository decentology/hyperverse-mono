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
		<NewInstance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: '',
	startTime: parseInt(((new Date().getTime() + 60 * 1000) / 1000).toFixed(0)),
	endTime: parseInt(((new Date().getTime() + 60 ** 3 * 1000) / 1000).toFixed(0)),
	units: 10,
	ERC721: '0x0000000000000000000000000000000000000000',
	ERC20: '0x0000000000000000000000000000000000000000',
	merkleRoot: '',
};
