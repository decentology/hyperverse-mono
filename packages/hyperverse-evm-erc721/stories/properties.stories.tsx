import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { CollectionInfo, useERC721 } from '../source/react';
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
	const { loading, proxyContract, getName, getSymbol, getCollectionInfo, getTokenCounter } =
		useERC721();
	const [name, setName] = useState('');
	const [symbol, setSymbol] = useState('');
	const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>({
		isPublicSaleActive: false,
		isCollectionLocked: false,
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
				setSymbol(symbol);
				setTotalTokens(totalTokens.toNumber());
				setCollectionInfo({
					isPublicSaleActive: collectionInfo.isPublicSaleActive,
					isCollectionLocked: collectionInfo.isCollectionLocked,
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
				<li>
					<span style={{ fontWeight: 'bold' }}>Price:</span>{' '}
					{ethers.utils.formatEther(collectionInfo.price)}
				</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>Public Sale:</span>{' '}
					{collectionInfo.isPublicSaleActive.toString()}
				</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>Collection Locked:</span>{' '}
					{collectionInfo.isCollectionLocked.toString()}
				</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>Max Supply:</span>{' '}
					{collectionInfo.maxSupply.toNumber()}
				</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>Max Per User:</span>{' '}
					{collectionInfo.maxPerUser.toNumber()}
				</li>
			</ul>
		</div>
	);
}
