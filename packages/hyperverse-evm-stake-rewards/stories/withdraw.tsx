import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Withdraw = ({ ...props }: { amount: number }) => {
	const { withdraw } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					withdraw?.(props.amount);
				}}
			>
				Withdraw Tokens
			</button>
		</>
	);
};
