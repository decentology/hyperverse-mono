import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn, Story } from '@storybook/react';
import Doc from '../docs/newInstance.mdx';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof NewInstance>;

export const Demo: ComponentStoryFn<typeof NewInstance> = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);

Demo.args = {
	name: 'Test',
	symbol: 'TST',
}
