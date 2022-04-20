import { GetStakeToken } from './getStakeToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getStakeToken.mdx';

export default {
	title: 'Components/GetStakeToken',
	component: GetStakeToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetStakeToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};