import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setBaseURI.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetBaseURI>;

export const Demo: ComponentStoryFn<typeof SetBaseURI> = (args: any) => (
	<HyperverseProvider>
		<SetBaseURI {...args} />
	</HyperverseProvider>
);

Demo.args = {
	baseURI: 'https://site-1.com/',
};
