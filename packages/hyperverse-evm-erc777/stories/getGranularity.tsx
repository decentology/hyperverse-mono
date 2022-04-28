import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const GetGranularity = ({ ...props }) => {
	const { Granularity } = useERC777();
	const { data: granularity } = Granularity();
	return (
		<div className="allowance">
			Granularity: <b>{granularity}</b>
		</div>
	);
};

GetGranularity.propTypes = {};

GetGranularity.defaultProps = {};
