import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from '../../ComponentStyles';
import { useERC777 } from '@decentology/hyperverse-evm-erc777/react';
import { useMutation } from 'react-query';

const Mint = () => {
	const { account } = useEthereum();
	const erc777 = useERC777();

	const { mutate } = useMutation('createInstance', erc777.mint);

	const [amount, setAmount] = useState(0);

	const mint = async () => {
		try {
			mutate(amount);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Mint</h4>
			<p>Mint more tokens</p>
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
								type="number"
								min="0"
								placeholder="Amount"
								onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={mint}>{!account ? 'Connet Wallet' : 'Mint'}</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Mint;
