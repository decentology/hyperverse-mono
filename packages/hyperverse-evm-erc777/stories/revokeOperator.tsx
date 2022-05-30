import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './style.css';

export const RevokeOperator = ({ ...props }) => {
	const { RevokeOperator } = useERC777();
	const { address } = useEvm();
	const { mutate } = RevokeOperator();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ operator: '' });
			}}
		>
			Revoke Operator
		</button>
	);
};

RevokeOperator.propTypes = {
	operator: PropTypes.string.isRequired
};

RevokeOperator.defaultProps = {};
