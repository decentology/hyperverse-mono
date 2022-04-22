import * as PropTypes from 'prop-types';
import { useToken } from '../source';
import './button.css';

export const MintToken = ({ ...props }) => {
	const { mintToken } = useToken();
	const { mutate } = mintToken();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
                // TODO
			}}
		>
			Mint Token
		</button>
	);
};

MintToken.propTypes = {
	recipient: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
};

MintToken.defaultProps = {};