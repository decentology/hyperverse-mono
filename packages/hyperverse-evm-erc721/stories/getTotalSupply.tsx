import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';

export const GetTotalSupply = ({ ...props }) => {
	const { TotalSupply } = useERC721();
	const { data: total } = TotalSupply();

	return (
			<div className="totalSupply">
				Total Supply: <b>{total}</b>
			</div>
	);
};

GetTotalSupply.propTypes = {
};

GetTotalSupply.defaultProps = {};
