import { GetAllTribes } from './getAllTribes';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getAllTribes.mdx';
import { Story } from '@storybook/react';
import { MetaDataFormatted } from '../source/types';

export default {
	title: 'Components/GetAllTribes',
	component: GetAllTribes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args) => (
	<HyperverseProvider>
		<GetAllTribes {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tribeOne: {
		name: 'Knight',
		id: 1,
		imageUrl: 'https://picsum.photos/200'
	},
	tribeTwo: {
		name: 'Mage',
		id: 2,
		imageUrl: 'https://picsum.photos/200'
	},
};
