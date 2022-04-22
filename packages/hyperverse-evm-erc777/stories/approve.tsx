import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Approve = ({ ...props }) => {
	const { Approve } = useERC777();
    const { address } = useEvm();
	const { mutate } = Approve();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				// if (address) {
				// 	mutate({ });
				// } else {
				// 	console.log("error");
				// }
			}}
		>
            Approve Transaction
		</button>
	);
};

Approve.propTypes = {
	spender: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
};

Approve.defaultProps = {};
