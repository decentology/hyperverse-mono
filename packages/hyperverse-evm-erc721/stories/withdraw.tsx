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
					withdraw?.();
				}}
			>
				Withdraw
			</button>
		</>
	);
};
