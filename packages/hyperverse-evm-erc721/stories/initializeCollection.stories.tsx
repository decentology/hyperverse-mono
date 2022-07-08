import { InitializeCollection } from './initializeCollection';
import { HyperverseProvider } from './utils/Provider';
import { Story } from '@storybook/react';
import Doc from '../docs/initializeCollection.mdx';

export default {
	title: 'Components/InitializeCollection',
	component: InitializeCollection,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args) => (
	<HyperverseProvider>
		<InitializeCollection {...args} />
	</HyperverseProvider>
);

export const Collection1 = Template.bind({});

Collection1.args = {
    price: 0.005,
    maxSupply: 50,
    maxPerUser: 5,
};
