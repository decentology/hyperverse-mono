import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default {
	title: 'General/Lite Node Cost & Supply',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component {...args} />
	</HyperverseProvider>
);

Demo.args = {
	cost: 50,
};

const Component = ({ cost }: { cost: number }) => {
	const { setLiteNodeCost, getLiteNodeCost, liteNodeSupply } = useSafuu();
	const [localCost, setLocalCost] = useState<number | null>();
	const [localSupply, setLocalSupply] = useState<number | null>();
	useEffect(() => {
		getLiteNodeCost?.().then(setLocalCost);
	}, [getLiteNodeCost]);
	useEffect(() => {
		liteNodeSupply?.().then(setLocalSupply);
	}, [liteNodeSupply]);
	const handleCost = () => {
		setLiteNodeCost!(cost).then(() => setLocalCost(cost));
	};
	return (
		<div>
			<h1>Lite Node Cost & Supply</h1>
			<p>Cost: {localCost}</p>
			<p>Supply: {localSupply}</p>
			<button onClick={handleCost}>Set Cost</button>
		</div>
	);
};
