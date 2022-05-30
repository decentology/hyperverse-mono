import * as PropTypes from 'prop-types';
import './style.css';
import { useNFT } from '../source';

export const GetTotalSupply = ({ tenantId, ...props }) => {
	const { getTotalSupply } = useNFT();
    const { totalSupply } = getTotalSupply(tenantId);

	return (
        <div className="totalSupply">
            Total Supply: <b>{totalSupply}</b>
        </div>
);
};

GetTotalSupply.propTypes = {
    tenantId: PropTypes.string.isRequired
};
