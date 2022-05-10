import { MintNFT } from './mintNFT';
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

const Template = (args) => <MintNFT {...args} />;

export const Demo = Template.bind({});

Demo.args = {
	recipient: '',
	name: '',
	description: '',
	thumbnail: '',
	metadata: null,
};
