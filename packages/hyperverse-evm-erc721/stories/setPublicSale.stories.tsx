import { SetPublicSale } from './setPublicSale';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setApprovalForAll.mdx';

export default {
	title: 'Components/SetPublicSale',
	component: SetPublicSale,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetPublicSale {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	publicSale: true,
};
