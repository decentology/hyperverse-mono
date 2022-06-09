import { ClaimWhitelist } from './claimWhitelist';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/claimWhitelist.mdx';

export default {
	title: 'Components/ClaimWhitelist',
	component: ClaimWhitelist,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<ClaimWhitelist {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: ''
};
