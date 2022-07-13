import { GetName } from './getName';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getName.mdx';

export default {
	title: 'Components/GetName',
	component: GetName,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetName>;

const Template: ComponentStoryFn<typeof GetName>= (args: any) => (
	<HyperverseProvider>
		<GetName {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
