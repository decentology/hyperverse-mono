import * as PropTypes from 'prop-types';
import './style.css';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const StakeTokens = ({ ...props }) => {
	const { StakeTokens } = useStakeRewards();
	const { address } = useEvm();
	const { mutate, data: amount } = StakeTokens();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
					mutate({amount});
			}}
		>
			Stake Tokens
		</button>
	);
};

StakeTokens.propTypes = {
	amount: PropTypes.number.isRequired,
};

StakeTokens.defaultProps = {};
