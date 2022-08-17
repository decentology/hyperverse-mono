import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC } from 'react';
import { useSafuu } from '../../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { useEffect } from 'react';
import { useState } from 'react';
export default {
	title: 'White List/Toggle Status',
} as ComponentMeta<typeof ToggleWhiteList>;

export const Demo: ComponentStoryFn<typeof ToggleWhiteList> = (args) => (
	<HyperverseProvider>
		<ToggleWhiteList {...args} />
	</HyperverseProvider>
);

Demo.args = {
	status: true,
};

const ToggleWhiteList = ({ status }: { status: boolean }) => {
	const { isWhiteListSaleActive, setWhiteListSaleStatus } = useSafuu();
	const [isActive, setIsActive] = useState<boolean>();
	useEffect(() => {
		if (isWhiteListSaleActive) {
			isWhiteListSaleActive().then(setIsActive);
		}
	}, [isWhiteListSaleActive]);
	const { Connect } = useEvm();
	return (
		<div>
			<Connect />
			<h1>White List Status</h1>
			<p>{JSON.stringify(isActive)}</p>
			<button
				onClick={() => {
					setWhiteListSaleStatus!(status).then(() => {
						setIsActive(status);
					});
				}}
			>
				Change Status
			</button>
		</div>
	);
};
