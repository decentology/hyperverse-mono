import { ApproveAll } from './setApprovalForAll';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setApprovalForAll.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/ApproveAll',
	component: ApproveAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof ApproveAll>;

const Template: ComponentStoryFn<typeof ApproveAll> = (args: any) => (
	<HyperverseProvider>
		<ApproveAll {...args} />
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
