import * as PropTypes from 'prop-types';
import './style.css';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Withdraw = ({ ...props }) => {
	const { WithdrawTokens } = useStakeRewards();
	const { address } = useEvm();
	const { mutate, data: amount } = WithdrawTokens();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
					mutate({amount});
			}}
		>
			Withdraw Tokens
		</button>
	);
};

Withdraw.propTypes = {
	amount: PropTypes.number.isRequired,
};

Withdraw.defaultProps = {};
