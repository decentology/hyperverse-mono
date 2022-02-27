import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-ethereum-erc721';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from './WriteComponents';

const MintNFT = () => {
	const { address } = useEthereum();
	const { MintNFT } = useERC721();
	const { mutate } = MintNFT();
	const [receiver, setReceiver] = useState('');

	const createNewInstance = async () => {
		try {
			const instanceData = {
				to: receiver
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Mint NFT</h4>
			<p>Mint NFT to someone</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Mint'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Receiver"
								onChange={(e) => setReceiver(e.target.value)}
							/>
							<Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Mint'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default MintNFT;
