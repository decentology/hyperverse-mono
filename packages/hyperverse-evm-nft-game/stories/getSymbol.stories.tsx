import { GetSymbol } from './getSymbol';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getSymbol.mdx';

export default {
	title: 'Components/GetSymbol',
	component: GetSymbol,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetSymbol>;

const Template: ComponentStoryFn<typeof GetSymbol>= (args: any) => (
	<HyperverseProvider>
		<GetSymbol {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
