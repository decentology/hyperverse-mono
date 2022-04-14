import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';

export const GetTotalSupply = ({ ...props }) => {
	const { TotalSupply } = useERC20();
	const { data: totalSupply } = TotalSupply();

	return (
			<div className="totalSupply">
				Total Supply: <b>{totalSupply}</b>
			</div>
	);
};

GetTotalSupply.propTypes = {
};

GetTotalSupply.defaultProps = {};
