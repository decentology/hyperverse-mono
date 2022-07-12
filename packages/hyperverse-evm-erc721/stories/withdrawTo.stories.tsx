import { WithdrawTo } from './withdrawTo';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/withdrawTo.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/WithdrawTo',
	component: WithdrawTo,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<WithdrawTo {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	price: 0.05,
};
