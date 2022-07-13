import { IsApprovedForAll } from './isApprovedForAll';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/isApprovedForAll.mdx';

export default {
	title: 'Components/IsApprovedForAll',
	component: IsApprovedForAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof IsApprovedForAll>;

const Template: ComponentStoryFn<typeof IsApprovedForAll> = (args: any) => (
	<HyperverseProvider>
		<IsApprovedForAll {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
