import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC777 } from '@decentology/hyperverse-evm-erc777';
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
import { useQuery } from 'react-query';


const CheckOperator = () => {
	const { account } = useEthereum();
	const [operator, setOperator] = useState('');
	const [tokenHolder, setTokenHolder] = useState('');

	const erc777 = useERC777();

	const { data: instance } = useQuery('checkInstance', () => erc777.checkInstance!(account!));

	const { data, isLoading, refetch } = useQuery('checkOperator', () =>
		erc777.checkOperator!({operator: operator!, tokenHolder:tokenHolder!})
	);

	const [hidden, setHidden] = useState(false);
	return (
		<Box>
			<h4>Check Operator</h4>
			<p>Checks if an account is an operator for another account</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Check Operator'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Operator"
								onChange={(e) => setOperator(e.target.value)}
							/>
							<Input
								placeholder="Token Holder"
								onChange={(e) => setTokenHolder(e.target.value)}
							/>

							<Button
								onClick={() => {
									refetch();
									setHidden((p) => !p);
								}}
							>
								{!account
									? 'Connect Wallet'
									: !instance
									? 'No Instance'
									: isLoading
									? 'fetching ...'
									: !hidden
									? 'Check Operator'
									: data!.toString()}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Token Module)</Module>
		</Box>
	);
};

export default CheckOperator;
