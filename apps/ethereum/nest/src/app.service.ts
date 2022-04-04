import { Injectable } from '@nestjs/common';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TribesLibrary } from '@decentology/hyperverse-evm-tribes';
import { Blockchain, Network } from '@decentology/hyperverse';
import { ethers } from 'ethers';
@Injectable()
export class AppService {
	async getHello(): Promise<string> {
		const tribes = new TribesLibrary({
			blockchainName: Blockchain.Ethereum,
			network: {
				type: Network.Testnet,
				name: 'rinkeby',
				networkUrl: 'https://rinkeby.infura.io/v3/fb9f66bab7574d70b281f62e19c27d49',
			},
			tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
			providerOrSigner: new ethers.providers.JsonRpcProvider(
				'https://rinkeby.infura.io/v3/fb9f66bab7574d70b281f62e19c27d49',
			),
			storage: {
				clientUrl: 'https://fileportal.org',
				uploadFile: async (file: File) => {
					return await Promise.resolve({ skylink: 'https://fileportal.org/' + file.name });
				}
			}
		});
		const totalTribes = await tribes.getAllTribes();
		return renderToStaticMarkup(
			React.createElement('div', null, `Total Tenants: ${totalTribes}`),
		);
	}
}
