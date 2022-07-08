import { GetBaseURI } from './getBaseURI';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/togglePublicMint.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/GetBaseURI',
	component: GetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<GetBaseURI {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
