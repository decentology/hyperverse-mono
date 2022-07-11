import { StoryFn } from '@storybook/react';
import { HyperverseProvider } from './Provider';

export const hyperverseDecorator = (Story: StoryFn) => (
	<HyperverseProvider>
		<Story />
	</HyperverseProvider>
);
