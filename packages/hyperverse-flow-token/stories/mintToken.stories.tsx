import { MintToken } from './mintToken';
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

const Template = (args) => <MintToken {...args} />;

export const Demo = Template.bind({});

Demo.args = {
	recipient: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f', // i need accounts to mess with
    amount: 1000
};
