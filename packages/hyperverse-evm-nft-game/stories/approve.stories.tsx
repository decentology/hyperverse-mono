import { Approve } from './approve';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/approve.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/Approve',
	component: Approve,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof Approve>;

export const Demo: ComponentStoryFn<typeof Approve> = (args: any) => (
	<HyperverseProvider>
		<Approve {...args} />
	</HyperverseProvider>
);

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};
