import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const StakeTokens = ({ ...props }: { amount: number }) => {
	const { stake } = useStakeRewards();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					stake(props.amount);
				}}
			>
				Stake Tokens
			</button>
		</>
	);
};
