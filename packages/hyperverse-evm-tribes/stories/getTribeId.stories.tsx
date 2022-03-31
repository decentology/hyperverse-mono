import { GetTribeId } from './getTribeId';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/gettribeid.mdx';

export default {
	title: 'Components/GetTribeId',
	component: GetTribeId,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribeId {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});
Demo.args = {
	account: '',
};
