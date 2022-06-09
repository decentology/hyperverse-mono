import { SetMerkleRoot } from './setMerkleroot';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/setMerkleroot.mdx';

export default {
	title: 'Components/SetMerkleRoot',
	component: SetMerkleRoot,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetMerkleRoot {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    root: '',
};
