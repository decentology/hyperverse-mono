import * as PropTypes from 'prop-types';
import './style.css';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const NewInstance = ({ ...props }) => {
	const { NewInstance } = useStakeRewards();
	const { address, connect } = useEvm();
	const { mutate } = NewInstance();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				console.log('Calling mutate');
				if (address) {
					mutate({ account: address, stakingToken: 'STK', rewardsToken: 'RTK', rewardRate: 0.2 });
				} else {
					connect();
				}
			}}
		>
			{address ? 'New Instance' : 'Connect'}
		</button>
	);
};

NewInstance.propTypes = {
	account: PropTypes.string.isRequired,
};

NewInstance.defaultProps = {};
