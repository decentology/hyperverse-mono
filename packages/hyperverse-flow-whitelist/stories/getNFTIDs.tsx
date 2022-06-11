import * as PropTypes from 'prop-types';
import './style.css';
import { useWhitelist } from '../source';
import { useState, useEffect } from 'react';


export const GetNFTIDs = ({ ...props }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			whitelist.getNFTIDs().then(setData);
		};
	}, []);

	return (
		<div className="NFTIDs">
			NFT IDs: <b>{data}</b>
		</div>
	);
};

GetNFTIDs.propTypes = {};

GetNFTIDs.defaultProps = {};
