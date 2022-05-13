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
	tenantId: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
	accountAddress: '0x4ddbaf7fe601ac46'
};
