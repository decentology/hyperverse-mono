import { useSafuu } from '@decentology/hyperverse-bsc-safuu/react';
import { useQueries, useQuery } from '@tanstack/react-query';
export const Statistics = ({ nodeType }: { nodeType: 'full' | 'lite' }) => {
	const {
		fullNodeSupply,
		liteNodeSupply,
		fullNodeLimit,
		liteNodeLimit,
		getFullNodeCost,
		getLiteNodeCost,
	} = useSafuu();
	const [{ data: supply }, { data: cost }, { data: total }] = useQueries({
		queries: [
			{
				queryKey: ['supply', nodeType],
				queryFn: () => (nodeType == 'full' ? fullNodeSupply!() : liteNodeSupply!()),
			},
			{
				queryKey: ['cost', nodeType],
				queryFn: () => (nodeType == 'full' ? getFullNodeCost!() : getLiteNodeCost!()),
			},
			{
				queryKey: ['total', nodeType],
				queryFn: () => (nodeType == 'full' ? fullNodeLimit!() : liteNodeLimit!()),
			},
		],
	});
	return (
		<table>
			<tr>
				<td>Purchased Nodes</td>
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
