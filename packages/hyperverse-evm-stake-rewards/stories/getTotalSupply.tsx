import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';

export const GetTotalSupply = ({ ...props }) => {
	const { TotalSupply } = useStakeRewards();
	const { data: totalSupply } = TotalSupply();

	return (
		<div className="totalSupply">
			Total Supply: <b>{totalSupply}</b>
		</div>
	);
};

GetTotalSupply.propTypes = {};

GetTotalSupply.defaultProps = {};
