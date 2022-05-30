import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './style.css';

export const Mint = ({ ...props }) => {
	const { Mint } = useERC777();
	const { address } = useEvm();
	const { mutate } = Mint();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ amount: 3 });
			}}
		>
			Mint
		</button>
	);
};

Mint.propTypes = {
	amount: PropTypes.number.isRequired,
};

Mint.defaultProps = {};
