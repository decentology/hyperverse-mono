import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useERC721 } from '@decentology/hyperverse-evm-erc721/react';
import { toast } from 'react-toastify';
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

const Transfer = () => {
	const { account } = useEthereum();
	const erc721 = useERC721();
	const { mutate, isLoading, error } = useMutation('transfer', erc721.transfer);

	const [receiver, setReceiver] = useState<string>('');
	const [tokenId, setTokenId] = useState(0);
	

	const transfer = async () => {
		try {
			const instanceData: { from:string, to: string; tokenId: number } = {
				from: account!,
				to: receiver,
				tokenId: tokenId,
			};

			mutate(instanceData);
		} catch (error) {
			console.log('e', error);
			throw error;
		}
	};

	useEffect(() => {
		if (error) {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	}, [error]);

	return (
		<Box>
			<h4>Transfer NFT</h4>
			<p>Transfer your NFT to the provided address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Transfer Tokens'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Receiver"
								onChange={(e) => setReceiver(e.target.value)}
							/>
							<Input
								placeholder="TokenID"
								onChange={(e) => setTokenId(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={transfer}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Transfer'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Transfer;
