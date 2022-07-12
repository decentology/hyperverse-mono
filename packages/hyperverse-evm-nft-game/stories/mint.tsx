import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';
import { NumberLiteralType } from 'typescript';

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
