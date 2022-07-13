import { WithdrawTokens } from './withdrawTokens';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/withdrawTokens.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/WithdrawTokens',
	component: WithdrawTokens,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof WithdrawTokens>;

export const Demo: ComponentStoryFn<typeof WithdrawTokens> = (args: any) => (
	<HyperverseProvider>
		<WithdrawTokens {...args} />
	</HyperverseProvider>
);

Demo.args = {};
