import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useState } from 'react';
import './style.css';

export const Withdraw = ({ ...props }) => {
	const { withdraw } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
<<<<<<<< HEAD:packages/hyperverse-evm-erc721/stories/withdraw.tsx
					withdraw?.();
========
					togglePublicMint?.(true);
>>>>>>>> erc721-sb-update:packages/hyperverse-evm-erc721/stories/togglePublicMint.tsx
				}}
			>
				Withdraw
			</button>
		</>
	);
};
