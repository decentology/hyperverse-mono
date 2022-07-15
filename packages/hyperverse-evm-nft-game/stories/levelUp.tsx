import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const LevelUp = ({ ...props }: { tokenId: number }) => {
	const { levelUp } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					levelUp!(props.tokenId);
				}}
			>
				Level Up
			</button>
		</>
	);
};
