import { InitializeCollection } from './initializeCollection';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/initializeCollection.mdx';
import { ComponentMeta, Story } from '@storybook/react';

export default {
	title: 'Components/InitializeCollection',
	component: InitializeCollection,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof InitializeCollection>;

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<InitializeCollection {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	price: 0.005,
	maxSupply: 50,
	maxPerUser: 5,
	lockCollection: false,
};
