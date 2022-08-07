import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { SafuuLibrary, useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ModuleLibraryType } from '../source/safuuLibrary';

export default {
	title: 'Withdraw/Tokens',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component {...args} />
	</HyperverseProvider>
);

Demo.args = {
	tokenContract: '0x0000000000000000000000000000000000000000',
	toAddress: '0x0000000000000000000000000000000000000000',
};

const Component = ({ tokenContract, toAddress }: { tokenContract: string; toAddress: string }) => {
	const { withdrawTokens } = useSafuu();
	const handleWithdraw = () => {
		withdrawTokens!(tokenContract, toAddress);
	};
	return (
		<div>
			<h1>Withdraw Tokens</h1>
			<button onClick={handleWithdraw}>Withdraw</button>
		</div>
	);
};
