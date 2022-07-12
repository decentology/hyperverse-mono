import { Withdraw } from './withdraw';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/withdraw.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/Withdraw',
	component: Withdraw,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof Withdraw>;

const Template: ComponentStoryFn<typeof Withdraw> = (args) => (
	<HyperverseProvider>
		<Withdraw {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
