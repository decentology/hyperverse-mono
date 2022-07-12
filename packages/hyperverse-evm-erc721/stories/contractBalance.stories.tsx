import { ContractBalance } from './contractBalance';
import { HyperverseProvider } from './utils/Provider';
import { Story } from '@storybook/react';
import Doc from '../docs/contractBalance.mdx';

export default {
	title: 'Components/ContractBalance',
	component: ContractBalance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<ContractBalance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
