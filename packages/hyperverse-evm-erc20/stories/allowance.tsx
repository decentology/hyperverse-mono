import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const Allowance = ({ ...props }) => {
	const { allowance } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				allowance({'', ''});
			}}
		>
			Allowance
		</button>
	) : (
		<Connect />
	);
};

Allowance.propTypes = {};

Allowance.defaultProps = {};
