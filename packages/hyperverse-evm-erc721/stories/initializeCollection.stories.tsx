import { InitializeCollection } from './initializeCollection';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/initializeCollection.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/InitializeCollection',
	component: InitializeCollection,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
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
