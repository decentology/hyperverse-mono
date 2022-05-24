import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetGranularity = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.getGranularity) {
			erc777.getGranularity().then(setData);
		}
	}, [erc777.getGranularity]);

	const granularity = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="granularity"> Granularity: {granularity()}</div>;
};

GetGranularity.propTypes = {};

GetGranularity.defaultProps = {};
