import * as PropTypes from 'prop-types';
import './style.css';
import { useWhitelist } from '../source';
import { useState, useEffect } from 'react';


export const GetBalance = ({ ...props }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			whitelist.getBalance().then(setData);
		};
	}, []);

	return (
		<div className="balance">
			Balance: <b>{data}</b>
		</div>
	);
};

GetBalance.propTypes = {};

GetBalance.defaultProps = {};
