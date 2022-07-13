import { ModifyDynamicAttributes } from './modifyDynamicAttributes';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/modifyDynamicAttributes.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/ModifyDynamicAttributes',
	component: ModifyDynamicAttributes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof ModifyDynamicAttributes>;

export const Demo: ComponentStoryFn<typeof ModifyDynamicAttributes> = (args: any) => (
	<HyperverseProvider>
		<ModifyDynamicAttributes {...args} />
	</HyperverseProvider>
);

Demo.args = {
	tokenId: 1,
	attributes: [7, 8, 9],
};
