import * as PropTypes from 'prop-types';
import './style.css';
import { useNFT } from '../source';

export const GetNFTMetadata = ({ ...props }) => {
	const { getNFTMetadata } = useNFT();
    const { nftMetadata } = getNFTMetadata();

	return (
        <div className="nftMetadata">
            NFT Metadata: <b>{nftMetadata}</b>
        </div>
);
};

GetNFTMetadata.propTypes = {
    tenantId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    account: PropTypes.string.isRequired
};
