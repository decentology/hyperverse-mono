import { TokenURI } from './tokenURI';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/tokenURI.mdx';

export default {
	title: 'Components/TokenURI',
	component: TokenURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof TokenURI>;

const Template: ComponentStoryFn<typeof TokenURI> = (args) => (
	<HyperverseProvider>
		<TokenURI {...args} />
	</HyperverseProvider>
);

export const Token1 = Template.bind({});

Token1.args = {
	tokenId: 1,
};

export const Token2 = Template.bind({});

Token2.args = {
	tokenId: 2,
};
