import { ActivateClaiming } from './activateClaiming';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/activateClaiming.mdx';

export default {
	title: 'Components/ActivateClaiming',
	component: ActivateClaiming,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<ActivateClaiming {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
