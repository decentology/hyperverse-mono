import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
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
	const [totalTokens, setTotalTokens] = useState(0);
	useEffect(() => {
		if (proxyContract) {
			(async () => {
				console.log(proxyContract);
				const name = await proxyContract.name();
				const symbol = await proxyContract.symbol();
				const totalTokens = (await proxyContract.tokenCounter()) as BigNumber;
				setName(name);
				setSymbol(symbol);
				setTotalTokens(totalTokens.toNumber());
			})();
		}
	}, [proxyContract]);
	return (
		<div className="body">
			<h1><b>Name:</b> {name}</h1>
			<h2><b>Symbol:</b> {symbol}</h2>
			<h2><b>Total Tokens:</b> {totalTokens}</h2>
		</div>
	);
}
