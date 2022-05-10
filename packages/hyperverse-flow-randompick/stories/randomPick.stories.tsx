import { RandomPick } from './randomPick';
import React from 'react';
import { Doc } from '../docs/randomPick.mdx';

export default {
	title: 'Components/RandomPick',
	component: RandomPick,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => <RandomPick {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
