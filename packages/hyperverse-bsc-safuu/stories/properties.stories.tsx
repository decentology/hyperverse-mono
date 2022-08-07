import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default {
	title: 'Properties/Properties',
} as ComponentMeta<typeof Properties>;

export const Demo: ComponentStoryFn<typeof Properties> = (args) => (
	<HyperverseProvider>
		<Properties {...args} />
	</HyperverseProvider>
);

const Properties: FC = () => {
	const { getName, getSymbol } = useSafuu();
	const [name, setName] = useState('');
	const [symbol, setSymbol] = useState('');
	useEffect(() => {
		getName?.().then(setName);
		getSymbol?.().then(setSymbol);
	}, [getName, getSymbol]);
	return (
		<div>
			<h1>Properties</h1>
			<ul>
				<li>Name: {name}</li>
				<li>Symbol: {symbol}</li>
			</ul>
		</div>
	);
};
