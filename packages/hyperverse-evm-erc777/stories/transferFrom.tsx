import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './button.css';

export const TransferFrom = ({ ...props }) => {
	const { TransferFrom } = useERC777();
	const { address } = useEvm();
	const { mutate } = TransferFrom();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ from: '', to: '', value: 10 });
			}}
		>
			Transfer From
		</button>
	);
};

TransferFrom.propTypes = {
	from: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
};

TransferFrom.defaultProps = {};
