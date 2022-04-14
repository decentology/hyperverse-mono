import * as PropTypes from 'prop-types';
import './button.css';
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
					mutate({ account: '', stakingToken: '', rewardsToken: '', rewardRate: 0 });
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
