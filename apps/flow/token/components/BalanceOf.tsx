import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useFlow } from '@decentology/hyperverse-flow';
import { useToken } from '@decentology/hyperverse-flow-token';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from './WriteFunctions/WriteComponents';

const BalanceOf = () => {
	const flow = useFlow();
	const token = useToken();
	const [account, setAccount] = useState("0x686c97969a1b9e0b");
	const [balance, setBalance] = useState(null);

	const getBalanceFromModule = async () => {
		let balanceOfUser = await token.getBalance(account);
		console.log(balanceOfUser)
		setBalance(balanceOfUser);
	}

	return (
		<Box>
			<h4>Get Balance Of</h4>
			<p>Get the balance of an account</p>
			<Input
				placeholder="Account"
				onChange={(e) => setAccount(e.target.value)}
			/>

			<Button onClick={() => getBalanceFromModule()}>
				{!flow.user?.addr ? 'Connect Wallet' : 'Get Balance Of'}
			</Button>
			<p>{balance}</p>
		</Box>
	);
};

export default BalanceOf;
