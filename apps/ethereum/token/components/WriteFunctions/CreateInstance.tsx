import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC20 } from '@decentology/hyperverse-evm-erc20';
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

import { useQuery, useMutation } from 'react-query';

const CreateInstance = () => {
	const { account } = useEthereum();
	const erc20 = useERC20();
	const { data: instance } = useQuery('instance', () => erc20.checkInstance!(account));

	const { mutate, isLoading } = useMutation('createTokenInstance', erc20.createTokenInstance);

	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [tokenDecimals, setTokenDecimals] = useState(0);

	const createNewInstance = async () => {
		try {
			mutate({
				account: account!,
				name: tokenName,
				symbol: tokenSymbol,
				decimal: tokenDecimals,
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
							<Input
								type="number"
								min="0"
								placeholder="Token Decimal"
								onChange={(e) => setTokenDecimals(e.currentTarget.valueAsNumber)}
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
function NewInstance(): { mutate: any; isLoading: any } {
	throw new Error('Function not implemented.');
}
