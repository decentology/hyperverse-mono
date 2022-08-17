import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC } from 'react';
import { useSafuu } from '../../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { useEffect } from 'react';
import { useState } from 'react';
export default {
	title: 'Gold List/Properties',
} as ComponentMeta<typeof GoldListProperties>;

export const Demo: ComponentStoryFn<typeof GoldListProperties> = (args) => (
	<HyperverseProvider>
		<GoldListProperties {...args} />
	</HyperverseProvider>
);

const GoldListProperties: FC = () => {
	const { isGoldListSaleActive, getGoldListMerkleRoot } = useSafuu();
	const [isActive, setIsActive] = useState<boolean>();
	const [root, setRoot] = useState<string>();
	useEffect(() => {
		if (isGoldListSaleActive) {
			isGoldListSaleActive().then(setIsActive);
		}
	}, [isGoldListSaleActive]);
	useEffect(() => {
		if (getGoldListMerkleRoot) {
			getGoldListMerkleRoot().then(setRoot);
		}
	}, [getGoldListMerkleRoot]);
	const { Connect } = useEvm();
	return (
		<div>
			<Connect />
			<h1>Gold List Status</h1>
			<p>{JSON.stringify(isActive)}</p>
			<h1>Gold List Merkle Root</h1>
			<p>{root}</p>
		</div>
	);
};
