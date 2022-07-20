import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useERC721 } from '@decentology/hyperverse-evm-erc721/react';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from '../ComponentStyles';
import { useMutation } from 'react-query';

const TenantMint = () => {
	const { account } = useEthereum();

	const erc721 = useERC721();
	const { mutate, isLoading } = useMutation('tenantMint', erc721.tenantMint);
	const [imageFile, setImageFile] = useState<File>();

	const [receiver, setReceiver] = useState('');

	const mint = async () => {
		try {
			const instanceData: {
				image: File | undefined;
				to: string;
			} = {
				image: imageFile,
				to: receiver,
			};
console.log(instanceData)
			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Mint</h4>
			<p>Mint an NFT (tenant only)</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Mint'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Receiver"
								onChange={(e) => setReceiver(e.target.value)}
							/>
							<Input
								type="file"
								id="nft-file"
								name="nftImage"
								accept="image/*, .jpg"
								placeholder="Receiver"
								onChange={(e) => setImageFile(e!.target!.files![0])}
							/>
							<Button onClick={mint}>
								{!account
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

export default TenantMint;
