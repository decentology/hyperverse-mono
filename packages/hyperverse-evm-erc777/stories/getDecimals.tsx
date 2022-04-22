import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const GetDecimals = ({ ...props }) => {
	const { Decimals } = useERC777();
	const { data: decimals } = Decimals();

	return (
			<div className="decimals">
				Decimals: <b>{decimals}</b>
			</div>
	);
};

GetDecimals.propTypes = {
};

GetDecimals.defaultProps = {};
