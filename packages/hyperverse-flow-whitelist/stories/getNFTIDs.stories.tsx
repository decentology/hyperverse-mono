import { GetNFTIDs } from './getNFTIDs';
import React from 'react';
import { Doc } from '../docs/getNFTIDs.mdx';

export default {
	title: 'Components/GetNFTIDs',
	component: GetNFTIDs,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <GetNFTIDs {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
