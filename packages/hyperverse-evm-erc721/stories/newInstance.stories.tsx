import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/newInstance.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
