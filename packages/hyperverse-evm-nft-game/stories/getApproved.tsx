import React from 'react';
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const GetApproved = ({ ...props }: { tokenId: number }) => {
	const { getApproved } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getApproved!(props.tokenId);
				}}
			>
				Get Approved
			</button>
		</>
	);
};
