import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
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

const BaseURI = () => {
	const { account } = useEthereum();
	const erc721 = useERC721();
	const { mutate, error, isLoading } = useMutation('transfer', erc721.setBaseURI);

	const [baseURI, setBaseURI] = useState<string>('');

	const setURI = async () => {
		try {
			mutate(baseURI);
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
			<h4>Base URI</h4>
			<p>Set the base URI for your ERC721</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Set Base URI'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="URI"
								onChange={(e) => setBaseURI(e.target.value)}
							/>
							<Button onClick={setURI}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Set Base URI'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default BaseURI;
