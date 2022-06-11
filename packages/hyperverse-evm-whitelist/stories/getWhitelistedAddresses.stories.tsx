import { GetWhitelistedAddresses } from './getWhitelistedAddresses';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getWhitelistedAddresses.mdx';

export default {
	title: 'Components/GetWhitelistedAddresses',
	component: GetWhitelistedAddresses,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetWhitelistedAddresses {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
