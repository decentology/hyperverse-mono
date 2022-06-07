import { DeactivateClaiming } from './deactivateClaiming';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/deactivateClaiming.mdx';

export default {
	title: 'Components/DeactivateClaiming',
	component: DeactivateClaiming,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<DeactivateClaiming {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
