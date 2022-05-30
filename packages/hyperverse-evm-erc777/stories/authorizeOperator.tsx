
import * as PropTypes from 'prop-types';
import './style.css';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const AuthorizeOperator = ({ ...props }) => {
	const { AuthorizeOperator } = useERC777();
	const { address, connect } = useEvm();
	const { mutate } = AuthorizeOperator();

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
			Authorize Operator
		</button>
	);
};

AuthorizeOperator.propTypes = {
	operator: PropTypes.string.isRequired
};

AuthorizeOperator.defaultProps = {};
