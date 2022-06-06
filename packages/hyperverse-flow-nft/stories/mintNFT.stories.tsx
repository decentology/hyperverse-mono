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
	recipient: '0x4ddbaf7fe601ac46', // blocto address
	name: 'firstNFT',
	description: 'The very first NFT.',
	thumbnail: '',
	metadata: '', // keep empty
};
