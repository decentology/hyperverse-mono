import { GetNFTMetadata } from './getNFTMetadata';
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

const Template = (args) => <GetNFTMetadata {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
