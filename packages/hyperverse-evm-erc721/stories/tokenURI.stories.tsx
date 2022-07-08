import { TokenURI } from './tokenURI';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/tokenURI.mdx';

export default {
	title: 'Components/TokenURI',
	component: TokenURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TokenURI {...args} />
	</HyperverseProvider>
);

export const Token1 = Template.bind({});

Token1.args = {
	tokenId: 1,
};

export const Token2 = Template.bind({});

Token2.args = {
	tokenId: 2,
};
