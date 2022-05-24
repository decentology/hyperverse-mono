import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ balance, ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(balance);

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf().then(setData);
		}
	}, [erc721.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>This is not a valid address.</p>
		);
	};

	return <div className="balanceOf"> Balance Of: {balanceAvailable()}</div>;
};

GetBalanceOf.propTypes = {};

GetBalanceOf.defaultProps = {};
