import { UploadFile } from './filePicker';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';

export default {
	title: 'Components/UploadFile',
	component: UploadFile,
	// parameters: {
	// 	docs: {
	// 		page: Doc,
	// 	},
	// },
};

const Template = (args) => <UploadFile {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
