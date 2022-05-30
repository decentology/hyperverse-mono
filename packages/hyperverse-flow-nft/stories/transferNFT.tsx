import * as PropTypes from 'prop-types';
import { useNFT } from '../source';
import './style.css';

export const TransferNFT = ({ ...props }) => {
	const { transferNFT } = useNFT();
	const { } = transferNFT();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
                // TODO
			}}
		>
			Transfer NFT
		</button>
	);
};

TransferNFT.propTypes = {
	tenantId: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    withdrawID: PropTypes.number.isRequired
};

TransferNFT.defaultProps = {};