import { Form } from './form';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';

export default {
	title: 'Components/Form',
	component: Form,
};

const Template = (args) => <Form {...args} />;

export const Demo = Template.bind({});

Demo.args = {};
