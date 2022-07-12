import { GetAttributesByTokenId } from './getAttributesByTokenId';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getBalanceOf.mdx';

export default {
	title: 'Components/GetAttributesByTokenId',
	component: GetAttributesByTokenId,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetAttributesByTokenId>;

const Template: ComponentStoryFn<typeof GetAttributesByTokenId> = (args: any) => (
	<HyperverseProvider>
		<GetAttributesByTokenId {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};
