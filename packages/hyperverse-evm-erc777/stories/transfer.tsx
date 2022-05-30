import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './style.css';

export const Transfer = ({ ...props }) => {
	const { Transfer } = useERC777();
	const { address } = useEvm();
	const { mutate } = Transfer();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ to: '', value: 10});
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
