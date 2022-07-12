import { SetMintPermissions } from './setMintPermissions';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/transfer.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetMintPermissions',
	component: SetMintPermissions,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetMintPermissions>;

const Template: ComponentStoryFn<typeof SetMintPermissions> = (args: any) => (
	<HyperverseProvider>
		<SetMintPermissions {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	isPublic: true,
};
