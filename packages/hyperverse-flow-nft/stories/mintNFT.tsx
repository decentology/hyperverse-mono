import * as PropTypes from 'prop-types';
import { useNFT } from '../source';
import './style.css';

export const MintNFT = ({ ...props }) => {
	const { mintNFT } = useNFT();
	const { } = mintNFT('', '', '', '', '');

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
                // TODO
			}}
		>
			Mint NFT
		</button>
	);
};

MintNFT.propTypes = {
	recipient: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    metadata: PropTypes.any.isRequired
};

MintNFT.defaultProps = {};