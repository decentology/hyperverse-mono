import { HyperverseProvider } from '../utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React, { FC, useState } from 'react';
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
	const { mintLiteNode } = useSafuu();
	const [error, setError] = useState<Error | null>(null);
	const { Connect } = useEvm();
	const mint = () => {
		setError(null);
		mintLiteNode!(1).catch(setError);
	};
	return (
		<div>
			<Connect />
			<button onClick={mint}>Attempt White List Mint</button>
			{error && <p>{error.message}</p>}
		</div>
	);
};
