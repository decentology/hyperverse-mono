import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { CollectionInfo, useERC721 } from '../source';
import { HyperverseProvider } from './utils/Provider';

export default {
	title: 'Base/Properties',
	component: Properties,
} as ComponentMeta<typeof Properties>;

export const Demo: ComponentStoryFn<typeof Properties> = () => (
	<HyperverseProvider>
		<Properties />
	</HyperverseProvider>
);

function Properties() {
	const { loading,proxyContract,  getName, getSymbol, getCollectionInfo, getTokenCounter } = useERC721();
	const [name, setName] = useState('');
	const [symbol, setSymbol] = useState('');
	const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>({
		isPublicSaleActive: false,
		maxPerUser: BigNumber.from(0),
		maxSupply: BigNumber.from(0),
		price: BigNumber.from(0),
	});
	const [totalTokens, setTotalTokens] = useState(0);
	useEffect(() => {
		if (!loading) {
			(async () => {
				const name = await getName!();
				const symbol = await getSymbol!();
				const collectionInfo = await getCollectionInfo!();
				const totalTokens = await getTokenCounter!();
				setName(name);
				console.log(name)
				setSymbol(symbol);
				setTotalTokens(totalTokens.toNumber());
				setCollectionInfo({
					isPublicSaleActive: collectionInfo.isPublicSaleActive,
					maxPerUser: collectionInfo.maxPerUser,
					maxSupply: collectionInfo.maxSupply,
					price: collectionInfo.price,
				});
			})();
		}
	}, [proxyContract, loading]);
	return (
		<div>
			<h1>Name: {name}</h1>
			<h2>Symbol: {symbol}</h2>
			<h2>Total Tokens: {totalTokens}</h2>
			<h2>Collection Info</h2>
			<ul>
				{(Object.keys(collectionInfo) as Array<keyof typeof collectionInfo>).map((key) => (
					<li key={key}>
						<span style={{ fontWeight: 'bold' }}>{key}:</span>{' '}
						{BigNumber.isBigNumber(collectionInfo[key])
							? collectionInfo[key].toString()
							: collectionInfo[key].toString()}
					</li>
				))}
			</ul>
		</div>
	);
}
