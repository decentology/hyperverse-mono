import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { SafuuLibrary, useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ModuleLibraryType } from '../source/safuuLibrary';

export default {
	title: 'General/Check Elligibility',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component {...args} />
	</HyperverseProvider>
);

Demo.args = {
	address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
};

const Component = ({ address }: { address: string }) => {
	const { checkEligibility } = useSafuu();
	const [valid, setValid] = useState(false);
	useEffect(() => {
		if (checkEligibility) {
			console.log('Running against address', address);
			setValid(checkEligibility(address.toLowerCase(), true));
		}
	}, [checkEligibility, address]);
	return (
		<div>
			<h1>Approve Tokens</h1>
			<div>isValid: {valid.toString()}</div>
		</div>
	);
};
