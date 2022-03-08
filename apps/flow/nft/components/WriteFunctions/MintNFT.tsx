import { useState } from 'react';
import { useFlow } from '@decentology/hyperverse-flow';
import { useNFT } from '@decentology/hyperverse-flow-nft';
import {
	Box,
	Input,
	Button,
} from './WriteComponents';

const MintNFT = () => {
	const flow = useFlow();
	const nft = useNFT();
	const [receiver, setReceiver] = useState('');
	const [done, setDone] = useState(false);

	const mintAnNFT = async () => {
		setDone(false);
		const tx = await nft.mintNFT(receiver, "Jacob", "This is a NFT representing Jacob's face", "", {});
		setDone(true);
	};

	return (
		<Box>
			<h4>Mint NFT</h4>
			<p>Mint NFT to someone</p>
			<Input
				placeholder="Receiver"
				onChange={(e) => setReceiver(e.target.value)}
			/>
			<Button onClick={mintAnNFT}>
				{!flow.user?.addr ? 'Connet Wallet' : 'Mint'}
			</Button>
			<p>{done ? "Done!" : null}</p>
		</Box>
	);
};

export default MintNFT;
