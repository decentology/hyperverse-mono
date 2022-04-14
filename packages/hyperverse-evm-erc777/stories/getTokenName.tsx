import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const GetTokenName = ({ ...props }) => {
	const { TokenName } = useERC777();
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
