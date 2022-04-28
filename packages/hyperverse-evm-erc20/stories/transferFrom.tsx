import * as PropTypes from 'prop-types';
import './button.css';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const TransferFrom = ({ ...props }) => {
	const { TransferFrom } = useERC20();
	const { address } = useEvm();
	const { mutate } = TransferFrom();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
					mutate({ from: address, to: address, value: 100 });
			}}
		>
            Transfer From
		</button>
	);
};

TransferFrom.propTypes = {
	from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

TransferFrom.defaultProps = {};
