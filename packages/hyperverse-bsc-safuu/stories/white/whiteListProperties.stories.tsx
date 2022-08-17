import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC } from 'react';
import { useSafuu } from '../../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { useEffect } from 'react';
import { useState } from 'react';
export default {
	title: 'White List/Properties',
} as ComponentMeta<typeof WhiteListProperties>;

export const Demo: ComponentStoryFn<typeof WhiteListProperties> = (args) => (
	<HyperverseProvider>
		<WhiteListProperties {...args} />
	</HyperverseProvider>
);

const WhiteListProperties: FC = () => {
	const { isWhiteListSaleActive, getWhiteListMerkleRoot } = useSafuu();
	const [isActive, setIsActive] = useState<boolean>();
	const [root, setRoot] = useState<string>();
	useEffect(() => {
		if (isWhiteListSaleActive) {
			isWhiteListSaleActive().then(setIsActive);
		}
	}, [isWhiteListSaleActive]);
	useEffect(() => {
		if (getWhiteListMerkleRoot) {
			getWhiteListMerkleRoot().then(setRoot);
		}
	}, [getWhiteListMerkleRoot]);
	const { Connect } = useEvm();
	return (
		<div>
			<Connect />
			<h1>White List Status</h1>
			<p>{JSON.stringify(isActive)}</p>
			<h1>White List Merkle Root</h1>
			<p>{root}</p>
		</div>
	);
};
