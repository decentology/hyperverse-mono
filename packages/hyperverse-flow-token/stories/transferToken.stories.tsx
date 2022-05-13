import { TransferToken } from './transferToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transferToken.mdx';

export default {
	title: 'Components/TransferToken',
	component: TransferToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TransferToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
	recipient: '0x4ddbaf7fe601ac46',
	amount: 1000,
};
