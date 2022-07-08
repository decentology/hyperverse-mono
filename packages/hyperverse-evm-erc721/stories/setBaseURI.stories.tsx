import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setBaseURI.mdx';
import { Story } from '@storybook/react';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<SetBaseURI {...args} />
	</HyperverseProvider>
);

export const BaseURI1 = Template.bind({});

BaseURI1.args = {
	baseURI: 'https://site-1.com/nfts/',
};


