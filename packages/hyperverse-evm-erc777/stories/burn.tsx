
import * as PropTypes from 'prop-types';
import './button.css';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Burn = ({ ...props }) => {
	const { Burn } = useERC777();
	const { address, connect } = useEvm();
	const { mutate } = Burn();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				// if (address) {
				// 	mutate({  });
				// } else {
				// 	// TODO
				// }
			}}
		>
		</button>
	);
};

Burn.propTypes = {
	amount: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired
};

Burn.defaultProps = {};
