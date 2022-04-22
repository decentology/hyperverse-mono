import { MintToken } from './mintToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/mintToken.mdx';

export default {
	title: 'Components/MintToken',
	component: MintToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<MintToken {...args} />
	</HyperverseProvider>
);

export const MintDemo = Template.bind({});

MintDemo.args = {
	recipient: '',
    amount: ''
};