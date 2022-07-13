import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TransferFrom = ({ ...props }: { from: string, to: string; tokenId: number }) => {
	const { transferFrom } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					transferFrom!(props);
				}}
			>
				Transfer From
			</button>
		</>
	);
};
