import { MintNFT } from './mintNFT';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/mintNFT.mdx';

export default {
	title: 'Components/MintNFT',
	component: MintNFT,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<MintNFT {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199 '
};
