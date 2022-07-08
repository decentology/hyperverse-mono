import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { CollectionInfo } from '../source/types';
import { useERC721 } from '../source';
import { HyperverseProvider } from './utils/Provider';
import { Story } from '@storybook/react';

export default {
	title: 'Base/Properties',
	component: Properties,
};

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<Properties {...args} />
	</HyperverseProvider>
);

export const Base = Template.bind({});

function Properties() {
	const { proxyContract } = useERC721();
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
		if (proxyContract) {
			(async () => {
				console.log(proxyContract);
				const name = await proxyContract.name();
				const symbol = await proxyContract.symbol();
				const collectionInfo = (await proxyContract.collectionInfo()) as CollectionInfo;
				const totalTokens = (await proxyContract.tokenCounter()) as BigNumber;
				setName(name);
				setSymbol(symbol);
				setTotalTokens(totalTokens.toNumber());
				console.log(collectionInfo);
				setCollectionInfo({
					isPublicSaleActive: collectionInfo.isPublicSaleActive,
					maxPerUser: collectionInfo.maxPerUser,
					maxSupply: collectionInfo.maxSupply,
					price: collectionInfo.price,
				});
			})();
		}
	}, [proxyContract]);
	return (
		<div className="body">
			<h2>Name: {name}</h2>
			<h2>Symbol: {symbol}</h2>
			<h2>Total Tokens: {totalTokens}</h2>
			<h2>Collection Info:</h2>
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
