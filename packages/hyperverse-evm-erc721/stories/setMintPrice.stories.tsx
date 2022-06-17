import { SetMintPrice } from './setMintPrice';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setMintPrice.mdx';

export default {
	title: 'Components/SetMintPrice',
	component: SetMintPrice,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetMintPrice {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	price: 10,
};
