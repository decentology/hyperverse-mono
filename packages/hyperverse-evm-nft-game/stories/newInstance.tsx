import React from 'react';
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useNFTGame();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance!({
						name: 'TEST',
						symbol: 'TST',
						account: address!,
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};
