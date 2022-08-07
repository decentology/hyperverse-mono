import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC } from 'react';
import { useSafuu } from '../../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { useEffect } from 'react';
import { useState } from 'react';
export default {
	title: 'Gold List/Toggle Status',
} as ComponentMeta<typeof ToggleGoldList>;

export const Demo: ComponentStoryFn<typeof ToggleGoldList> = (args) => (
	<HyperverseProvider>
		<ToggleGoldList {...args} />
	</HyperverseProvider>
);

const ToggleGoldList: FC = () => {
	const { isGoldListSaleActive, setGoldListSaleStatus } = useSafuu();
	const [isActive, setIsActive] = useState<boolean>();
	useEffect(() => {
		if (isGoldListSaleActive) {
			isGoldListSaleActive().then(setIsActive);
		}
	}, [isGoldListSaleActive]);
	const { Connect } = useEvm();
	return (
		<div>
			<Connect />
			<h1>Gold List Status</h1>
			<p>{JSON.stringify(isActive)}</p>
			<button
				onClick={() => {
					setGoldListSaleStatus!(!isActive).then(() => {
						setIsActive(!isActive);
					});
				}}
			>
				Change Status
			</button>
		</div>
	);
};
