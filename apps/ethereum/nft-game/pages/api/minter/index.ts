import { NextApiRequest, NextApiResponse } from "next";
import { NFTGameLibrary, NFTGame } from '@decentology/hyperverse-evm-nft-game'
import { Network, initialize } from '@decentology/hyperverse';
import { ethers } from 'ethers';
import { Ethereum, Localhost } from '@decentology/hyperverse-ethereum';

const hyperverse = initialize({
	blockchain: Localhost, // Switch to Ethereum when testing on Testnet
	network: Network.Testnet,
	modules: [
		{
			bundle: NFTGame,
			tenantId: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
		},
	],
});

// Get default provider for localhost when developing against storybook
const provider = ethers.getDefaultProvider('http://localhost:8545');

// Storybook Private key Account #0
const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>
) {
	const lib = await NFTGameLibrary(hyperverse, signer);
	const name = await lib.getName();
	// await lib.setMintPermissions(true);
	const mintTx = await lib.mint({
		to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
		tokenName: 'Test Name',
		eyeId: 1,
		mouthId: 2,
		bodyId: 3,
		level: 0,
		standardChoices: [1, 1, 0, 0, 0],
		standardOptions: [1, 1, 0, 0, 0],
		specialChoices: [0, 0],
		specialOptions: [0, 0]
	});
	return res.status(200).json({
		hello: name,
		tx: mintTx.transactionHash
	});

}
