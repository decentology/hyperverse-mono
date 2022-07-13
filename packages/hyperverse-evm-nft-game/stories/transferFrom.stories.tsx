import { TransferFrom } from './transferFrom';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/transferFrom.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/TransferFrom',
	component: TransferFrom,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof TransferFrom>;

export const Demo: ComponentStoryFn<typeof TransferFrom> = (args: any) => (
	<HyperverseProvider>
		<TransferFrom {...args} />
	</HyperverseProvider>
);

Demo.args = {
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};
