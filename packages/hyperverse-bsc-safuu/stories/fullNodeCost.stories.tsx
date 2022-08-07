import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default {
	title: 'General/Full Node Cost & Supply',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component {...args} />
	</HyperverseProvider>
);

Demo.args = {
	cost: 500,
};

const Component = ({ cost }: { cost: number }) => {
	const { setFullNodeCost, getFullNodeCost, fullNodeSupply } = useSafuu();
	const [localCost, setLocalCost] = useState<number | null>();
	const [localSupply, setLocalSupply] = useState<number | null>();
	useEffect(() => {
		getFullNodeCost?.().then(setLocalCost);
	}, [getFullNodeCost]);
	useEffect(() => {
		fullNodeSupply?.().then(setLocalSupply);
	}, [fullNodeSupply]);
	const handleCost = () => {
		setFullNodeCost!(cost).then(() => setLocalCost(cost));
	};
	return (
		<div>
			<h1>Full Node Cost & Supply</h1>
			<p>Cost: {localCost}</p>
			<p>Supply: {localSupply}</p>
			<button onClick={handleCost}>Set Cost</button>
		</div>
	);
};
