import * as PropTypes from 'prop-types';
import './style.css';
import { useWhitelist } from '../source';
import { useState, useEffect } from 'react';


export const GetTotalSupply = ({ ...props }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			whitelist.getTotalSupply().then(setData);
		};
	}, []);

	return (
		<div className="totalSupply">
			Total Supply: <b>{data}</b>
		</div>
	);
};

GetTotalSupply.propTypes = {};

GetTotalSupply.defaultProps = {};
