import { SetBaseURI } from './setBaseURI';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { hyperverseDecorator } from './utils/decorators';
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

export const Demo: ComponentStoryFn<typeof SetBaseURI> = (args) => <SetBaseURI {...args} />;
Demo.args = {
	baseURI: 'https://site-1.com/',
};
