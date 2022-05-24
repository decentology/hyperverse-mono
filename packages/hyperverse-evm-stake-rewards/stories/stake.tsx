import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const StakeTokens = ({ ...props }) => {
	const { stake } = useStakeRewards();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				stake({});
			}}
		>
			Stake Tokens
		</button>
	) : (
		<Connect />
	);
};

StakeTokens.propTypes = {};

StakeTokens.defaultProps = {};
