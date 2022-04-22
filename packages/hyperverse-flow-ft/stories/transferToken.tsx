import * as PropTypes from 'prop-types';
import { useToken } from '../source';
import './button.css';

export const TransferToken = ({ ...props }) => {
	const { transferToken } = useToken();
	const {  } = transferToken();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
                // TODO
			}}
		>
			Transfer Token
		</button>
	);
};

TransferToken.propTypes = {
    tenantId: PropTypes.string.isRequired,
	recipient: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
};

TransferToken.defaultProps = {};