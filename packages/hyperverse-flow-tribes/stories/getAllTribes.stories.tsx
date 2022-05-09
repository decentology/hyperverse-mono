import { GetAllTribes } from './getAllTribes';
import { Provider } from '../source/Provider';
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
	<Provider>
		<GetAllTribes {...args} />;
	</Provider>
);

export const Demo = Template.bind({});

Demo.args = {
	tenantId: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
};
