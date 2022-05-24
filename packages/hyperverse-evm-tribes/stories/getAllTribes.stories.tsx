import { GetAllTribes } from './getAllTribes';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getAllTribes.mdx';

export default {
	title: 'Components/GetAllTribes',
	component: GetAllTribes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetAllTribes {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
