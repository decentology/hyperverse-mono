import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useStakeRewards();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance?.({
						account: address!,
						stakeToken: 'STK',
						rewardToken: 'RWD',
						rewardRate: 20,
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};
