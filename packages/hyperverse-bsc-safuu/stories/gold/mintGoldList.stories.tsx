import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC, useState } from 'react';
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
	const [error, setError] = useState<Error | null>(null);
	const { Connect } = useEvm();
	const mint = () => {
		setError(null);
		mintGoldList!(1, 0).catch(setError);
	};
	return (
		<div>
			<Connect />
			<button onClick={mint}>Attempt Gold List Mint</button>
			{error && <p>{error.message}</p>}
		</div>
	);
};
