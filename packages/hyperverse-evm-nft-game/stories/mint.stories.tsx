import { Mint } from './mint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
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

const Template: ComponentStoryFn<typeof Mint> = (args: any) => (
	<HyperverseProvider>
		<Mint {...args} />
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
	standardChoices: [1,1,0,0],
	standardOptions: [1,1,0,0],
	specialChoices: [0,0],
	specialOptions: [0,0],
};
