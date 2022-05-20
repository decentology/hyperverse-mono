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


const Allowance = () => {
	const { account } = useEthereum();
	const [owner, setOwner] = useState('');
	const [spender, setSpender] = useState('');

	const erc777 = useERC777();

	const { data: instance } = useQuery('checkInstance', () => erc777.checkInstance!(account!));

	const { data, isLoading, refetch } = useQuery('allowance', () =>
		erc777.allowance!(owner!, spender!)
	);

	const [hidden, setHidden] = useState(false);
	return (
		<Box>
			<h4>Allowance</h4>
			<p>Checks the amount of tokens that an owner allowed to a spender</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Get Allowance'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Owner "
								onChange={(e) => setOwner(e.target.value)}
							/>
							<Input
								placeholder="Spender"
								onChange={(e) => setSpender(e.target.value)}
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
									? 'Get Allowance'
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

export default Allowance;
