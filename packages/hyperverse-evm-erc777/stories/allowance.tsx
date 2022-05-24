import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useEffect, useState } from 'react';

export const Allowance = ({ ...props }) => {
	const erc721 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.allowance) {
			erc721.allowance(address, '').then(setData);
		}
	}, [erc721.allowance]);

	return (
		<div className="allowance">
			<div>Allowance: </div>
			<pre>{data}</pre>
		</div>
	);
};

Allowance.propTypes = {};

Allowance.defaultProps = {};
