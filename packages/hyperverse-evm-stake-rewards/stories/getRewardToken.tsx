import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const GetRewardToken = ({ ...props }) => {
	const { getRewardToken } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getRewardToken();
				}}
			>
				Get Reward Tokens
			</button>
		</>
	);
};
