import { SetBaseURI } from './setBaseURI';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { hyperverseDecorator } from './utils/decorators';
import Doc from '../docs/setBaseURI.mdx';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
	decorators: [hyperverseDecorator],
} as ComponentMeta<typeof SetBaseURI>;

export const Demo: ComponentStoryFn<typeof SetBaseURI> = (args) => <SetBaseURI {...args} />;
Demo.args = {
	baseURI: 'https://site-1.com/',
};
