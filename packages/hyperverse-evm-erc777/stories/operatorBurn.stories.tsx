import { OperatorBurn } from './operatorBurn';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/operatorBurn.mdx';

export default {
	title: 'Components/OperatorBurn',
	component: OperatorBurn,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<OperatorBurn {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

const { ethers } = require('hardhat');

Demo.args = {
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 25,
	data: ethers.utils.formatBytes32String('0x'),
	operatorData: ethers.utils.formatBytes32String('0x'),
};
