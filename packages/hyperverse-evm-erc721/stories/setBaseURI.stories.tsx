import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import { ComponentStoryFn, Story } from '@storybook/react';
import Doc from '../docs/setBaseURI.mdx';

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

export const Demo: ComponentStoryFn<typeof SetBaseURI> = (args: any) => <SetBaseURI {...args} />;

Demo.args = {
	baseURI: 'https://site-1.com/',
};
