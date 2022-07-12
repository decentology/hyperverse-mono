import { SetMintPermissions } from './setMintPermissions';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setMintPermissions.mdx';
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

const Template: ComponentStoryFn<typeof SetMintPermissions> = (args) => (
	<HyperverseProvider>
		<SetMintPermissions {...args} />
	</HyperverseProvider>
);

export const True = Template.bind({});

True.args = {
	isPublic: true,
};

export const False = Template.bind({});

False.args = {
	isPublic: false,
};
