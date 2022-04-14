import { GetCurrentTribe } from './getCurrentTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getCurrentTribe.mdx';

export default {
	title: 'Components/GetCurrentTribe',
	component: GetCurrentTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetCurrentTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '',
	accountAddress: ''
};
