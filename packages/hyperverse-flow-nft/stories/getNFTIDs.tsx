import * as PropTypes from 'prop-types';
import './style.css';
import { useNFT } from '../source';

export const GetNFTID = ({ ...props }) => {
	const { getNFTIDs } = useNFT();
    const { nftID } = getNFTIDs();

	return (
        <div className="nftID">
            NFT ID: <b>{nftID}</b>
        </div>
);
};

GetNFTID.propTypes = {
    tenantId: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired
};
