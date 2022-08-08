import { useSafuu } from '@decentology/hyperverse-bsc-safuu/react';
import { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';

export const GoldListMint = () => {
	const { isGoldListSaleActive, mintGoldList } = useSafuu();
	const [isActive, setIsActive] = useState(false);
	const [nodes, setNodes] = useState({ fullNode: 0, liteNode: 0 });
	useEffect(() => {
		isGoldListSaleActive?.().then(setIsActive);
	}, [isGoldListSaleActive]);
	const handleMint = () => {
		mintGoldList!(nodes.fullNode, nodes.liteNode)
			.then(() => {
				// Update UI
			})
			.catch((err) => {
				// Update Error UI
			});
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
			</div>
		</div>
	);
};
