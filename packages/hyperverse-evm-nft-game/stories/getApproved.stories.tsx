import { GetApproved } from './getApproved';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/getApproved.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/GetApproved',
	component: GetApproved,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetApproved>;

const Template: ComponentStoryFn<typeof GetApproved> = (args: any) => (
	<HyperverseProvider>
		<GetApproved {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};
