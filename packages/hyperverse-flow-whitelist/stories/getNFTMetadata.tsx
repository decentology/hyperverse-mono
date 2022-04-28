import * as PropTypes from 'prop-types';
import './button.css';
import { useWhitelist } from '../source';
import { useState, useEffect } from 'react';


export const GetNFTMetadata = ({ ...props }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			whitelist.getNFTMetadata().then(setData);
		};
	}, []);

	return (
		<div className="NFTMetadata">
			Metadata: <b>{data}</b>
		</div>
	);
};

GetNFTMetadata.propTypes = {};

GetNFTMetadata.defaultProps = {};
