import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import { Doc } from '../docs/newInstance.mdx';
import { ComponentMeta, Story } from '@storybook/react';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof NewInstance>;

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
