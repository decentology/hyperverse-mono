import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setBaseURI.mdx';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetBaseURI {...args} />
	</HyperverseProvider>
);

export const BaseURI1 = Template.bind({});

BaseURI1.args = {
	baseURI: 'https://site-1.com/nfts/',
};

export const BaseURI2 = Template.bind({});

BaseURI2.args = {
	baseURI: 'https://site-2.com/nfts/',
};
