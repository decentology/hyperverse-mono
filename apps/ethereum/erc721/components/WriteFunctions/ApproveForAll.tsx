import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
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

const ApproveForAll = () => {
	const { account } = useEthereum();
	const [operator, setOperator] = useState('');
	const [approved, setApproved] = useState(0);

	const erc721 = useERC721();
	const { mutate, isLoading } = useMutation('approve', erc721.setApprovalForAll);

	const approve = async () => {
		try {
			const instanceData = {
				to: operator,
				approved: approved,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Approve For All</h4>
			<p> Approve or remove an operator to transfer tokens for any tokens you own</p>
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
								placeholder="Operator"
								onChange={(e) => setOperator(e.target.value)}
							/>
							<Input
								type="boolean"
								placeholder="True or False"
								onChange={(e) => setApproved(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={approve}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Approve For All'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default ApproveForAll;
