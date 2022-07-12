import { InitializeCollection } from './initializeCollection';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn, Story } from '@storybook/react';
import Doc from '../docs/initializeCollection.mdx';

export default {
	title: 'Components/InitializeCollection',
	component: InitializeCollection,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof InitializeCollection>;

export const Demo: ComponentStoryFn<typeof InitializeCollection> = (args) => (
	<HyperverseProvider>
		<InitializeCollection {...args} />
	</HyperverseProvider>
);

Demo.args = {
	price: 0.005,
	maxSupply: 50,
	maxPerUser: 5,
};
