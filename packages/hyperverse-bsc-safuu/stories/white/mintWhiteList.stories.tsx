import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC } from 'react';
import { useSafuu } from '../../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
export default {
	title: 'White List/Mint',
} as ComponentMeta<typeof MintWhiteList>;

export const Demo: ComponentStoryFn<typeof MintWhiteList> = (args) => (
	<HyperverseProvider>
		<MintWhiteList {...args} />
	</HyperverseProvider>
);

const MintWhiteList: FC = () => {
	const { mintWhiteList } = useSafuu();
	const { Connect } = useEvm();
	return (
		<div>
			<Connect />
			<button onClick={() => mintWhiteList!(1, 0)}>Attempt White List Mint</button>
		</div>
	);
};
