import { MintNFTForm } from './mintNFT';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/mintNFT.mdx';
import { within, userEvent } from '@storybook/testing-library';

export default {
	title: 'Components/MintNFT',
	component: MintNFTForm,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<MintNFTForm {...args} />
	</HyperverseProvider>
);

export const MintDemo = Template.bind({});

MintDemo.args = {
	to: '',
};


// MintNFTForm.play = async ({ canvasElement }) => {
// 	const canvas = within(canvasElement);

// 	await userEvent.type(canvas.getByTestId('address'), '0x000', {
// 		delay: 100,
// 	});

// 	await userEvent.click(canvas.getByRole('button'));
// };
