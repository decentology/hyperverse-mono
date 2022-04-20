import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';

export const GetTokenSymbol = ({ ...props }) => {
	const { TokenSymbol } = useERC20();
	const { data: tokenSymbol } = TokenSymbol();

	return (
			<div className="tokenSymbol">
				Token Symbol: <b>{tokenSymbol}</b>
			</div>
	);
};

GetTokenSymbol.propTypes = {
};

GetTokenSymbol.defaultProps = {};
