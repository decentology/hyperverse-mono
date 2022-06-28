import { GetBalanceOf } from './getBalanceOf';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getBalanceOf.mdx';

export default {
	title: 'Components/GetBalanceOf',
	component: GetBalanceOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBalanceOf {...args} />
	</HyperverseProvider>
);

export const Account1 = Template.bind({});

Account1.args = {
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
};

export const Account2 = Template.bind({});

Account2.args = {
	account: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc'
};

