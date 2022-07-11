import { TenantMint } from './tenantMint';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/tenantMint.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/TenantMint',
	component: TenantMint,
	argTypes: {
		image: { control: { type: 'file', accept: '.png' } },
	},
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<TenantMint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	image: File,
};
