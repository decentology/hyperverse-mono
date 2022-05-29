import { HyperverseProvider } from './utils/Provider';
import { Meta, Story } from '@storybook/react';
import { useModule } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import Doc from '../docs/connectWallet.mdx';

const Button = () => {
	const { Connect } = useEvm();
	const { factoryContract } = useModule();
	return (
		<div>
			<Connect />
			<h1>Factory Address</h1>
			<p>{factoryContract?.address}</p>
		</div>
	);
};

export default {
	title: 'Components/ConnectWallet',
	component: Button,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as Meta;

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<Button {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
