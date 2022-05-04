import { UploadFile } from './filePicker';
import React from 'react';

export default {
	title: 'Components/UploadFile',
	component: UploadFile,
};

const Template = (args) => <UploadFile {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
