import { Injectable } from '@nestjs/common';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TribesLibrary } from '@decentology/hyperverse-evm-tribes';
import { Blockchain, Network, initialize } from '@decentology/hyperverse';
import { ethers } from 'ethers';
import { Ethereum } from '@decentology/hyperverse-ethereum';
const networkUrl = 'https://rinkeby.infura.io/v3/fb9f66bab7574d70b281f62e19c27d49'
const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: []
})
const provider = new ethers.providers.InfuraProvider({
	chainId: 4,
	name: 'rinkeby',
}, 'fb9f66bab7574d70b281f62e19c27d49')
// const provider = new ethers.providers.JsonRpcProvider(networkUrl);
provider.ready.then(() => {
	console.log('Provider Ready')
});
const tribes = new TribesLibrary({
   blockchainName: Blockchain.Ethereum,
   network: {
	   type: Network.Testnet,
	   name: 'rinkeby',
	   networkUrl,
   },
   tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
   providerOrSigner: provider,
   storage: {
	   clientUrl: 'https://fileportal.org',
	   uploadFile: async (file: File) => {
		   return await Promise.resolve({ skylink: 'https://fileportal.org/' + file.name });
	   }
   }
});
Injectable()
export class AppService {
	async getHello(): Promise<string> {
		const totalTribes = await tribes.getTotalTenants();
		return renderToStaticMarkup(
			React.createElement('div', null, `Total Tenants: ${0}`),
		);
	}
}
