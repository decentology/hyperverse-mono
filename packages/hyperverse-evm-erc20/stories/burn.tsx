import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const Burn = ({ ...props }) => {
	const { burn } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				burn({});
			}}
		>
			Burn Tokens
		</button>
	) : (
		<Connect />
	);
};

Burn.propTypes = {};

Burn.defaultProps = {};
