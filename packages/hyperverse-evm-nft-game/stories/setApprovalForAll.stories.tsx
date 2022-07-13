import { SetApprovalForAll } from './setApprovalForAll';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setApprovalForAll.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetApprovalForAll',
	component: SetApprovalForAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetApprovalForAll>;

const Template: ComponentStoryFn<typeof SetApprovalForAll> = (args: any) => (
	<HyperverseProvider>
		<SetApprovalForAll {...args} />
	</HyperverseProvider>
);

export const Approve = Template.bind({});

Approve.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: true,
};

export const Deny = Template.bind({});

Deny.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: false,
};
