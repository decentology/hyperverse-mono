import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
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
import { useMutation } from 'react-query';

const MintNFT = () => {
	const { address } = useEthereum();
	const erc721 = useERC721();

	const { mutate, isLoading } = useMutation('createTokenInstance', erc721.mint);

	const [receiver, setReceiver] = useState('');

	const mintNFT = async () => {
		try {
			mutate(receiver);
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
							<Button onClick={mintNFT}>
								{!address
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Mint'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default MintNFT;
