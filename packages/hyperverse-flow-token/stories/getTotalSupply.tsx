import * as PropTypes from 'prop-types';
import { useToken } from '../source';

export const GetTotalSupply = ({ ...props }) => {
	const { getTotalSupply } = useToken();
	const { data: totalSupply } = getTotalSupply(props.tenantId);

	return (
		<div className="totalSupply">
			Total Supply: <b>{totalSupply}</b>
		</div>
	);
};

GetTotalSupply.propTypes = {
	tenantId: PropTypes.string.isRequired,
};

GetTotalSupply.defaultProps = {};
