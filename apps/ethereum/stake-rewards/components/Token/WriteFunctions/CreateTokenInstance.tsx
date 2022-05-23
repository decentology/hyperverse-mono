import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
	Module,
} from '../../ComponentStyles';
import { useMutation } from 'react-query';
import { useERC777 } from '@decentology/hyperverse-evm-erc777';

const CreateTokenInstance = () => {
	const { account } = useEthereum();
	const erc777 = useERC777();

	const { mutate } = useMutation('createInstance', erc777.createInstance);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [initialSupply, setInitialSupply] = useState(0);

	const operator = [account]
	const createNewInstance = async () => {
		try {
			mutate({
				account: account!,
				tokenName,
				tokenSymbol,
				operator,
				initialSupply,
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
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Create Instance'}
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
								onChange={(e) => setInitialSupply(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={createNewInstance}>
								{!account ? 'Connet Wallet' : 'Create Instance'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Token Module)</Module>
		</Box>
	);
};

export default CreateTokenInstance;
