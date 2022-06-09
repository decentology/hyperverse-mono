import { IsWhitelistedMerkle } from './isWhitelistedMerkle';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/isWhitelistedMerkle.mdx';

export default {
	title: 'Components/IsWhitelistedMerkle',
	component: IsWhitelistedMerkle,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<IsWhitelistedMerkle {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: ''
};
