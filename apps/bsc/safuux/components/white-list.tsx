import { useSafuu } from '@decentology/hyperverse-bsc-safuu/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { ImSpinner9 } from 'react-icons/im';

export const WhiteListMint = () => {
	const { isWhiteListSaleActive, mintWhiteList } = useSafuu();
	const [nodes, setNodes] = useState({ fullNode: 0, liteNode: 0 });
	const {
		mutate: mint,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useMutation<TransactionReceipt, Error, typeof nodes>((nodes) =>
		mintWhiteList!(nodes.fullNode, nodes.liteNode)
	);
	const { data: isActive } = useQuery(['whitelist-active', isWhiteListSaleActive], () =>
		isWhiteListSaleActive!()
	);
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
				<button disabled={!isActive} onClick={() => mint(nodes)}>
					Mint
				</button>
				{isLoading && <ImSpinner9 className="icon-spin" />}
				{isError && <div style={{ color: 'red' }}>{error?.message}</div>}
				{isSuccess && <div style={{ color: 'green' }}>Your nodes have been allocated!</div>}
			</div>
		</div>
	);
};
