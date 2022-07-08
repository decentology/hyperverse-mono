import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useERC721 } from '../source';
import { HyperverseProvider } from './utils/Provider';

export default {
	title: 'Base/Properties',
	component: Properties,
};

const Template = (args) => (
	<HyperverseProvider>
		<Properties {...args} />
	</HyperverseProvider>
);

export const Base = Template.bind({});

function Properties() {
	const { proxyContract } = useERC721();
	const [name, setName] = useState('');
	const [symbol, setSymbol] = useState('');
	const [totalTokens, setTotalTokens] = useState(0);
	useEffect(() => {
		if (proxyContract) {
			(async () => {
				console.log(proxyContract);
				const name = await proxyContract.name();
				const symbol = await proxyContract.symbol();
				const totalTokens = await proxyContract.tokenCounter() as BigNumber;
				setName(name);
				setSymbol(symbol);
				setTotalTokens(totalTokens.toNumber());
			})();
		}
	}, [proxyContract]);
	return (
		<div>
			<h1>Name: {name}</h1>
			<h2>Symbol: {symbol}</h2>
			<h2>Total Tokens: {totalTokens}</h2>
		</div>
	);
}
