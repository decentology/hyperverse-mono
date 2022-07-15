import React from 'react';
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const Mint = ({
	...props
}: {
	to: string;
	tokenName: string;
	eyeId: number;
	mouthId: number;
	bodyId: number;
	level: number;
	standardChoices: number[];
	standardOptions: number[];
	specialChoices: number[];
	specialOptions: number[];
}) => {
	const { mint } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					mint!(props);
				}}
			>
				Mint
			</button>
		</>
	);
};
