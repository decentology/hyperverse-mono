import { TenantMint } from './tenantMint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/mint.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/TenantMint',
	component: TenantMint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof TenantMint>;

const Template: ComponentStoryFn<typeof TenantMint> = (args: any) => (
	<HyperverseProvider>
		<TenantMint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenName: 'test',
	eyeId: 1,
	mouthId: 2,
	bodyId: 3,
	level: 1,
	standardChoices: [3, 4, 5],
	standardOptions: [3, 4, 5],
	specialChoices: [3, 4, 5],
	specialOptions: [3, 4, 5],
};
