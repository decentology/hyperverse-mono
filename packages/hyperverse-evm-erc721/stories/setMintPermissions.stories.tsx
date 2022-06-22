import { SetMintPermissions } from './setMintPermissions';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setMintPermissions.mdx';

export default {
	title: 'Components/SetMintPermissions',
	component: SetMintPermissions,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetMintPermissions {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	isPublic: true,
};
