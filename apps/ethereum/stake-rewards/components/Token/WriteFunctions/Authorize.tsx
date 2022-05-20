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
import { useMutation } from 'react-query';

const Approve = () => {
	const { account } = useEthereum();

	const erc777 = useERC777();

	const { mutate } = useMutation('claimReward', erc777.authorizeOperator);

	const [operator, setOperator] = useState('');

	const approve = async () => {
		try {
			mutate(operator)
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Authorize Operator</h4>
			<p> Authorize your stake instance to access your rewards token</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Authorize'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Operator"
								onChange={(e) => setOperator(e.target.value)}
							/>

							<Button onClick={approve}>
								{!account ? 'Connet Wallet' : 'Authorize'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Token Module)</Module>
		</Box>
	);
};

export default Approve;
