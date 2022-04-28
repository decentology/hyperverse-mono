import * as PropTypes from 'prop-types';
import './button.css';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Transfer = ({ ...props }) => {
	const { Transfer } = useERC20();
	const { address } = useEvm();
	const { mutate } = Transfer();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
					mutate({ to: address, value: 1 });
			}}
		>
			Transfer
		</button>
	);
};

Transfer.propTypes = {
    to: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

Transfer.defaultProps = {};
