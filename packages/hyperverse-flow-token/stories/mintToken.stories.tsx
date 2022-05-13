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

export const Demo = Template.bind({});

Demo.args = {
	recipient: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
	amount: 10,
};
