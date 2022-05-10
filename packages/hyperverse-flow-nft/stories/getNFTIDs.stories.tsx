import { GetNFTID } from './getNFTIDs';
import React from 'react';
import { Doc } from '../docs/getNFTIDs.mdx';

export default {
	title: 'Components/GetNFTID',
	component: GetNFTID,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <GetNFTID {...args} />;

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '',
	account: null,
};
