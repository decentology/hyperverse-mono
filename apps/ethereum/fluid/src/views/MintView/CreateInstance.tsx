import { FC, useState } from 'react';
import clsx from 'clsx';
import { useERC721 } from '@decentology/hyperverse-ethereum-fluid';

import { HOST_ADDRESS, CFA_ADDRESS, FDAIX_ADDRESS } from '../../constants';
import ConnectWallet from '../../components/ConnectWallet';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import CreateInstanceForm from './CreateInstanceForm';

interface CreateInstanceProps {
	className?: string;
}

const CreateInstance: FC<CreateInstanceProps> = ({ className }) => {
	const { address } = useEthereum();
	const { NewInstance } = useERC721();
	const { mutate } = NewInstance();
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');

	const handleMintNft = async (nftName: string, nftSymbol: string) => {
		try {
			if (!address) throw new Error('Please connect your wallet');

			const instanceData = {
				name: tokenName,
				symbol: tokenSymbol,
				hostAddress: HOST_ADDRESS,
				cfaAddress: CFA_ADDRESS,
				acceptedToken: FDAIX_ADDRESS,
			};

			console.log(
				'Creating an NFT Instance with name',
				tokenName,
				' with the symbol: ',
				tokenSymbol
			);
			mutate(instanceData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="w-full bg-white" id="create-instance">
			<div className="max-w-7xl mx-auto py-16 px-8 text-black">
				<h1 className="text-7xl font-bold">1. Define your NFT metadata</h1>
				{address ? (
					<CreateInstanceForm onSubmit={handleMintNft} />
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

export default CreateInstance;
