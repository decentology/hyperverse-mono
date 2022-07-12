import { SupportsInterface } from './supportsInterface';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getBalanceOf.mdx';

export default {
	title: 'Components/SupportsInterface',
	component: SupportsInterface,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SupportsInterface>;

const Template: ComponentStoryFn<typeof SupportsInterface>= (args: any) => (
	<HyperverseProvider>
		<SupportsInterface {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    interfaceId: ''
};
