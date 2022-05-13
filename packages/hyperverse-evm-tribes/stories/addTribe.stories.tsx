import { AddTribe } from './addTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/addTribe.mdx';
import { within, userEvent } from '@storybook/testing-library';

export default {
	title: 'Components/AddTribe',
	component: AddTribe,
	argTypes: {
		image: { control: { type: 'file', accept: '.png' } },
		name: { control: { type: 'text' } },
		description: { control: { type: 'text' } },
	},
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AddTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', {
		delay: 100,
	});
	await userEvent.type(canvas.getByTestId('password'), 'a-random-password', {
		delay: 100,
	});
	await userEvent.click(canvas.getByRole('button'));
};

Demo.args = {};
