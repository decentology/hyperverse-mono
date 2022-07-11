import { SetMintPermissions } from './setMintPermissions';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setMintPermissions.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/SetMintPermissions',
	component: SetMintPermissions,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
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
