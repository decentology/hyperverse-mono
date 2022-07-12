import { Injectable } from '@nestjs/common';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Network, initialize } from '@decentology/hyperverse';
import { ethers } from 'ethers';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import { ERC721, ERC721Library } from '@decentology/hyperverse-evm-erc721';

const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [
		{
			bundle: ERC721,
			tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
		},
	],
});

const provider = new ethers.providers.InfuraProvider(
	{
		chainId: 4,
		name: 'rinkeby',
	},
	'fb9f66bab7574d70b281f62e19c27d49',
);

Injectable();
export class AppService {
	async getHello(): Promise<string> {
		const { getTokenCounter } = await ERC721Library(hyperverse, provider);
		const tokens = await getTokenCounter();
		return renderToStaticMarkup(
			React.createElement('div', null, `Total Tokens: ${tokens}`),
		);
	}
}
