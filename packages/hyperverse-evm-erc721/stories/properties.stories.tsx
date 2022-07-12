import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { CollectionInfo } from '../source/types';
import { useERC721 } from '../source/react';
import { HyperverseProvider } from './utils/Provider';
import { Story } from '@storybook/react';

export default {
	title: 'Base/Properties',
	component: Properties,
} as ComponentMeta<typeof Properties>;

const Template: Story = (args: any) => (
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
		lockCollection: false,
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
				console.log(name);
				setSymbol(symbol);
				setTotalTokens(totalTokens.toNumber());
				setCollectionInfo({
					lockCollection: collectionInfo.lockCollection,
					maxPerUser: collectionInfo.maxPerUser,
					maxSupply: collectionInfo.maxSupply,
					price: collectionInfo.price,
				});
			})();
		}
	}, [proxyContract, loading]);
	return (
		<div className="body">
			<h2>Name: {name}</h2>
			<h2>Symbol: {symbol}</h2>
			<h2>Total Tokens: {totalTokens}</h2>
			<h2>Collection Info:</h2>
			<ul>
				<li>
					<span style={{ fontWeight: 'bold' }}>Price:</span>{' '}
					{ethers.utils.formatEther(collectionInfo.price)}
				</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>Public Sale:</span>{' '}
					{collectionInfo.lockCollection.toString()}
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
