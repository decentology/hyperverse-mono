import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const WithdrawTokens = ({ ...props }) => {
	const { withdrawTokens } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					withdrawTokens!();
				}}
			>
				Withdraw Tokens
			</button>
		</>
	);
};
