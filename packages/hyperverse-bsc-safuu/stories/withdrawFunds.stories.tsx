import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { SafuuLibrary, useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ModuleLibraryType } from '../source/safuuLibrary';

export default {
	title: 'Withdraw/Funds',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component {...args} />
	</HyperverseProvider>
);


const Component: FC = () => {
	const { withdrawFunds } = useSafuu();
	const handleWithdraw = () => {
		withdrawFunds!();
	};
	return (
		<div>
			<h1>Withdraw Funds</h1>
			<button onClick={handleWithdraw}>Withdraw</button>
		</div>
	);
};
