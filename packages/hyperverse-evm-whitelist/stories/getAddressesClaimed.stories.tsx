import { GetAddressesClaimed } from './getAddressesClaimed';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getAddressesClaimed.mdx';

export default {
	title: 'Components/GetAddressesClaimed',
	component: GetAddressesClaimed,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetAddressesClaimed {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
