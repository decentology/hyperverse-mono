import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalance = ({ ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getBalance) {
			erc721.getBalance().then(setData);
		}
	}, [erc721.getBalance]);

	return (
		<div className="balance">
			<div>Balance: </div>
			<pre>{data}</pre>
		</div>
	);
};

GetBalance.propTypes = {};

GetBalance.defaultProps = {};
