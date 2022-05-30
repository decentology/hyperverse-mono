import { useEffect, useState } from 'react';
import { useERC721 } from '../source';

export const GetTotalSupply = ({ ...props }) => {
	const { getTotalSuply } = useERC721();
	const [totalSupply, setTotalSupply] = useState(0);
	useEffect(() => {
		if (getTotalSuply) {
			getTotalSuply().then((value) => {
				setTotalSupply(value.toNumber());
			});
		}
	}, [getTotalSuply]);
	return (
		<div className="totalSupply">
			Total Supply: <b>{totalSupply}</b>
		</div>
	);
};
