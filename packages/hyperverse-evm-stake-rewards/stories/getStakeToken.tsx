import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const GetStakeToken = ({ ...props }) => {
	const { getStakeToken } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getStakeToken();
				}}
			>
				Get Stake Tokens
			</button>
		</>
	);
};
