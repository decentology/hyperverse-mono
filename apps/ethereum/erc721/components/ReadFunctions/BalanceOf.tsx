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
} from '../ComponentStyles';
import { useQuery } from 'react-query';

const BalanceOf = () => {
	const { account } = useEthereum();

	const [address, setAddress] = useState('');

	const erc721 = useERC721();
	const { data, isLoading } = useQuery('balanceOf', () => erc721.getBalanceOf!(address!));
	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Balance Of</h4>
			<p>Get the balance of a provided address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Get Balance Of'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Account"
								onChange={(e) => setAddress(e.target.value)}
							/>

							<Button onClick={() => setHidden((p) => !p)}>
								{!account
									? 'Connect Wallet'
									: isLoading
									? 'fetching ...'
									: !hidden
									? 'Get Balance Of'
									: data ? data.toString() : '0'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default BalanceOf;
