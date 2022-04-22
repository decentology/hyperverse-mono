import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './button.css';

export const OperatorBurn = ({ ...props }) => {
	const { OperatorBurn } = useERC777();
	const { address } = useEvm();
	const { mutate } = OperatorBurn();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ account: '', value: 10, data: '', operatorData: '' });
			}}
		>
			Operator Burn
		</button>
	);
};

OperatorBurn.propTypes = {
	account: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    operatorData: PropTypes.string.isRequired
};

OperatorBurn.defaultProps = {};
