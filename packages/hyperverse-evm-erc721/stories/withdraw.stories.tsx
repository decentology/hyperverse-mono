import { Withdraw } from './withdraw';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/withdraw.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/Withdraw',
	component: Withdraw,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<Withdraw {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
