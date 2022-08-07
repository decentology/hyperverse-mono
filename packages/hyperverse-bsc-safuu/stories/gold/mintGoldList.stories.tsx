import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC } from 'react';
import { useSafuu } from '../../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
export default {
	title: 'Gold List/Mint',
} as ComponentMeta<typeof MintGoldList>;

export const Demo: ComponentStoryFn<typeof MintGoldList> = (args) => (
	<HyperverseProvider>
		<MintGoldList {...args} />
	</HyperverseProvider>
);

const MintGoldList: FC = () => {
	const { mintGoldList } = useSafuu();
	const { Connect } = useEvm();
	return (
		<div>
			<Connect />
			<button onClick={() => mintGoldList!(1, 0)}>Attempt Gold List Mint</button>
		</div>
	);
};
