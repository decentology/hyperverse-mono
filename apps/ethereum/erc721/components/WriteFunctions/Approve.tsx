import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useERC721 } from '@decentology/hyperverse-evm-erc721/react';
import { useMutation } from 'react-query';
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

const Approve = () => {
	const { account } = useEthereum();
	const [to, setTo] = useState('');
	const [tokenId, setTokenId] = useState(0);

	const erc721 = useERC721();
	const { mutate, isLoading } = useMutation('approve', erc721.approve);

	const approve = async () => {
		try {
			const instanceData = {
				to: to,
				tokenId: tokenId,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Approve</h4>
			<p> Approve an account to transfer the token on your behalf</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Approve'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="To"
								onChange={(e) => setTo(e.target.value)}
							/>
							<Input
								type="number"
								min="0"
								placeholder="Token ID"
								onChange={(e) => setTokenId(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={approve}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Approve'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Approve;
