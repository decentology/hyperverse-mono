import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';

export const GetBalanceOf = ({ ...props }) => {
	const { BalanceOf } = useERC721();
	const { data: balanceOf } = BalanceOf(''); // wants an account address

	return (
			<div className="balanceOf">
				BalanceOf: <b>{balanceOf}</b>
			</div>
	);
};

GetBalanceOf.propTypes = {
};

GetBalanceOf.defaultProps = {};
