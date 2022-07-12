import { Mint } from './mint';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/mint.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
export default {
	title: 'Components/Mint',
	component: Mint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof Mint>;

const Template: ComponentStoryFn<typeof Mint> = (args) => (
	<HyperverseProvider>
		<Mint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 5,
};
