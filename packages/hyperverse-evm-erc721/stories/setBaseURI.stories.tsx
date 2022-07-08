import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setBaseURI.mdx';
import {
	ComponentMeta,
	ComponentStoryFn,
	StoryFn,
} from '@storybook/react';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
	decorators: [
		(Story: StoryFn) => (
			<HyperverseProvider>
				<Story />
			</HyperverseProvider>
		),
	],
} as ComponentMeta<typeof SetBaseURI>;

export const Demo: ComponentStoryFn<typeof SetBaseURI> = (args) => <SetBaseURI {...args} />;
Demo.args = {
	baseURI: 'https://site-1.com/',
};
