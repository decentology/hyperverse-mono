import React from 'react';
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const MintNFT = ({ ...props }: { to: string }) => {
	const { mint } = useNFTGame();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					mint(address);
				}}
			>
				Mint NFT
			</button>
		</>
	);
};
