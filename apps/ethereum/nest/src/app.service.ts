import { Injectable } from '@nestjs/common';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Network, initialize } from '@decentology/hyperverse';
import { ethers } from 'ethers';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as Tribes from '@decentology/hyperverse-evm-tribes';
import { TribesLibrary } from '@decentology/hyperverse-evm-tribes';

const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [
		{
			bundle: Tribes,
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
		const tribes = await TribesLibrary(hyperverse, provider);
		const totalTribes = await tribes.getTotalTenants();
		return renderToStaticMarkup(
			React.createElement('div', null, `Total Tenants: ${0}`),
		);
	}
}
