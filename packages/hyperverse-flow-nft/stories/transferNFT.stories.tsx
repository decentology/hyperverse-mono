import { TransferNFT } from './transferNFT';
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

const Template = (args) => <TransferNFT {...args} />;

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '',
	recipient: '',
	withdrawID: null,
};
