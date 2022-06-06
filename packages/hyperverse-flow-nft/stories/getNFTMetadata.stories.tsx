import { GetNFTMetadata } from './getNFTMetadata';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getNFTMetadata.mdx';

export default {
	title: 'Components/GetNFTMetadata',
	component: GetNFTMetadata,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetNFTMetadata {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '0x4ddbaf7fe601ac46',
	id: 1,
	account: '0x4ddbaf7fe601ac46',
};
