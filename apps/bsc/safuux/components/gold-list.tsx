import { useSafuu } from '@decentology/hyperverse-bsc-safuu/react';
import { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
export const GoldListMint = () => {
	const { isGoldListSaleActive, mintGoldList } = useSafuu();
	const [isActive, setIsActive] = useState(false);
	const [nodes, setNodes] = useState({ fullNode: 0, liteNode: 0 });
	const {
		mutate: mint,
		isLoading,
		isError,
		error,
		isSuccess
	} = useMutation<TransactionReceipt, Error, typeof nodes>((nodes) =>
		mintGoldList!(nodes.fullNode, nodes.liteNode)
	);
	useEffect(() => {
		isGoldListSaleActive?.().then(setIsActive);
	}, [isGoldListSaleActive]);
	const handleMint = () => {
		mint(nodes);
	};
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setNodes({ ...nodes, [e.target.name]: Number(e.target.value) });
	};
	return (
		<div>
			<input
				name="fullNode"
				type="number"
				max={1}
				placeholder={'Full Node'}
				onChange={handleChange}
			/>
			<input
				name="liteNode"
				type="number"
				max={5}
				placeholder={'Lite Node'}
				onChange={handleChange}
			/>
			<div>
				<button disabled={!isActive} onClick={handleMint}>
					Mint
				</button>
				{isError && <div style={{ color: 'red' }}>{error?.message}</div>}
				{isSuccess && <div style={{ color: 'green' }}>Your nodes have been allocated!</div>}
			</div>
		</div>
	);
};
