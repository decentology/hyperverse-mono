import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';

export const GetTokenName = ({ ...props }) => {
	const { TokenName } = useERC20();
	const { data: tokenName } = TokenName();

	return (
			<div className="tokenName">
				Token Name: <b>{tokenName}</b>
			</div>
	);
};

GetTokenName.propTypes = {
};

GetTokenName.defaultProps = {};
