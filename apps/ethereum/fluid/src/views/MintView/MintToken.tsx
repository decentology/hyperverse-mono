import { FC, useState } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-ethereum-fluid';

import ConnectWallet from '../../components/ConnectWallet';
import { ContractInfo } from '../ContractInfo';
import MintTokenForm from './MintTokenForm';

const MintToken: FC = () => {
	const { address } = useEthereum();
	const { MintNFT } = useERC721();
	const { mutate } = MintNFT();

	const handleMintNft = async (_receiver: string, _flowRate: string) => {
		try {
			if (!address) throw new Error('Please connect your wallet');
			const instanceData = {
				to: _receiver,
				flowRate: _flowRate,
			};
			console.log('Minting an NFT to ', _receiver, ' with the flow rate: ', _flowRate);
			mutate(instanceData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="w-full bg-gradient-to-r from-indigo-900 to-indigo-400" id="mint">
			<div className="max-w-7xl mx-auto py-16 px-8 text-white">
				<h1 className="text-7xl font-bold">2. Mint an NFT</h1>
				{address ? (
					<MintTokenForm onSubmit={handleMintNft} />
				) : (
					<div className="py-4">
						<h1 className="">Please connect your wallet to continue</h1>
						<ConnectWallet className="mt-4" />
					</div>
				)}
			</div>
		</section>
	);
};

export default MintToken;
