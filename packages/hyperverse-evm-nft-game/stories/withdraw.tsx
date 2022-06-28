import { useNFTGame } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Withdraw = ({ ...props }) => {
	const { withdraw } = useNFTGame();
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
