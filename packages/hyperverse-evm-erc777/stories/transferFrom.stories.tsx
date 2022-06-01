import { TransferFrom } from './transferFrom';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transferFrom.mdx';

export default {
	title: 'Components/TransferFrom',
	component: TransferFrom,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TransferFrom {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	from: '',
	to: '',
	amount: 10000,
};
