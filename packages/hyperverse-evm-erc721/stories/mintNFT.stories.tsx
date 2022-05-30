import { MintNFTForm } from './mintNFT';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/mintNFT.mdx';
import { within, userEvent } from '@storybook/testing-library';

export default {
	title: 'Components/MintNFT',
	component: MintNFTForm,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<MintNFTForm {...args} />
	</HyperverseProvider>
);

export const MintDemo = Template.bind({});

MintDemo.args = {
	to: '',
};

