import { TransferNFT } from './transferNFT';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transferNFT.mdx';

export default {
	title: 'Components/TransferNFT',
	component: TransferNFT,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TransferNFT {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '0x4ddbaf7fe601ac46',
	recipient: '0xd2a8d169a907bf1f',
	withdrawID: 1,
};
