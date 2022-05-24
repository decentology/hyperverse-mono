import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const Withdraw = ({ ...props }) => {
	const { withdraw } = useStakeRewards();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				withdraw({});
			}}
		>
			Withdraw Tokens
		</button>
	) : (
		<Connect />
	);
};

Withdraw.propTypes = {};

Withdraw.defaultProps = {};
