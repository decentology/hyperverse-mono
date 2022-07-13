import { LevelUp } from './levelUp';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/levelUp.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/LevelUp',
	component: LevelUp,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof LevelUp>;

export const Demo: ComponentStoryFn<typeof LevelUp> = (args: any) => (
	<HyperverseProvider>
		<LevelUp {...args} />
	</HyperverseProvider>
);

Demo.args = {
	tokenId: 1,
};
