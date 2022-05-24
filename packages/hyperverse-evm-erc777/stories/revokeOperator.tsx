import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const RevokeOperator = ({ ...props }) => {
	const { revokeOperator } = useERC777();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				revokeOperator(address);
			}}
		>
			Revoke Operator
		</button>
	) : (
		<Connect />
	);
};

RevokeOperator.propTypes = {};

RevokeOperator.defaultProps = {};
