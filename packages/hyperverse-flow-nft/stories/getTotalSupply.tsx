import * as PropTypes from 'prop-types';
import './button.css';
import { useNFT } from '../source';

export const GetTotalSupply = ({ ...props }) => {
	const { getTotalSupply } = useNFT();
    const { totalSupply } = getTotalSupply();

	return (
        <div className="totalSupply">
            Total Supply: <b>{totalSupply}</b>
        </div>
);
};

GetTotalSupply.propTypes = {
    tenantId: PropTypes.string.isRequired
};
