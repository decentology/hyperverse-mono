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

const Transfer = () => {
	const { account } = useEthereum();
	const erc721 = useERC721();
	const { mutate, isLoading } = useMutation('createTokenInstance', erc721.transfer);

	const [receiver, setReceiver] = useState('');
	const [tokenId, setTokenId] = useState(0);

	const createNewInstance = async () => {
		try {
			mutate({
				from: account!,
				to: receiver,
				tokenId: tokenId,
			});
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Transfer Tokens</h4>
			<p>Transfer Tokens to someone</p>
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
								type="number"
								min="0"
								placeholder="TokenId to transfer"
								onChange={(e) => setTokenId(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={createNewInstance}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Create Instance'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Transfer;
