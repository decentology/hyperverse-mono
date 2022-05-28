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
import { useMutation, useQuery } from 'react-query';

const CreateInstance = () => {
	const { account } = useEthereum();
	const erc721 = useERC721();
	const { data: instance } = useQuery('instance', () => erc721.checkInstance!(account));

	const { mutate, isLoading } = useMutation('createTokenInstance', erc721.createInstance);

	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');

	const createNewInstance = async () => {
		try {
			mutate({
				account: account!,
				tokenName,
				tokenSymbol,
			});
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>New Instance</h4>
			<p>Create your own instance of a token </p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account || instance}>
							{!account
								? 'Connect Wallet'
								: instance
								? 'You already have an instance'
								: 'Create Instance'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Token Name"
								onChange={(e) => setTokenName(e.target.value)}
							/>
							<Input
								placeholder="Token Symbol"
								onChange={(e) => setTokenSymbol(e.target.value)}
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

export default CreateInstance;
