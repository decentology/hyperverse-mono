import { SetDynamicAttributes } from './setDynamicAttributes';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setDynamicAttributes.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetDynamicAttributes',
	component: SetDynamicAttributes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetDynamicAttributes>;

export const Demo: ComponentStoryFn<typeof SetDynamicAttributes> = (args: any) => (
	<HyperverseProvider>
		<SetDynamicAttributes {...args} />
	</HyperverseProvider>
);

Demo.args = {
	tokenId: 1,
};
