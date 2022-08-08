import { useSafuu } from '@decentology/hyperverse-bsc-safuu/react';
import { useEffect, useState } from 'react';

export const Statistics = ({ nodeType }: { nodeType: 'full' | 'lite' }) => {
	const {
		fullNodeSupply,
		liteNodeSupply,
		fullNodeLimit,
		liteNodeLimit,
		getFullNodeCost,
		getLiteNodeCost,
	} = useSafuu();
	const [supply, setSupply] = useState<number | null>();
	const [total, setTotal] = useState<number | null>();
	const [cost, setCost] = useState<number | null>();
	useEffect(() => {
		switch (nodeType) {
			case 'full':
				fullNodeSupply?.().then(setSupply);
				fullNodeLimit?.().then(setTotal);
				getFullNodeCost?.().then(setCost);
				break;
			case 'lite':
				liteNodeSupply?.().then(setSupply);
				liteNodeLimit?.().then(setTotal);
				getLiteNodeCost?.().then(setCost);
				break;
		}
	}, [nodeType, fullNodeSupply, liteNodeSupply, fullNodeLimit, liteNodeLimit, getFullNodeCost, getLiteNodeCost]);
	return (
		<table>
			<tr>
				<td>Available Nodes</td>
				<td>{supply}</td>
			</tr>
			<tr>
				<td>Total Nodes</td>
				<td>{total}</td>
			</tr>
			<tr>
				<td>Node Cost</td>
				<td>{cost} Safuu</td>
			</tr>
		</table>
	);
};
