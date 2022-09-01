import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { SafuuLibrary, useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ModuleLibraryType } from '../source/safuuLibrary';

export default {
	title: 'Approve/Tokens',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component />
	</HyperverseProvider>
);

Demo.args = {};

const Component = () => {
	const { approve } = useSafuu();
	const handleWithdraw = () => {
		approve!(10);
	};
	return (
		<div>
			<h1>Approve Tokens</h1>
			<button onClick={handleWithdraw}>Approve</button>
		</div>
	);
};
