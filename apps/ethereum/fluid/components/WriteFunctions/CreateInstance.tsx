import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-ethereum-fluid';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from './WriteComponents';
import { CFA_ADDRESS, FDAIX_ADDRESS, HOST_ADDRESS } from '../../utils/constants';

const CreateInstance = () => {
	const { address } = useEthereum();
	const { NewInstance } = useERC721();
	const { mutate } = NewInstance();
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');

	const createNewInstance = async () => {
		try {
			const instanceData = {
				// tenantAddress: address,
				name: tokenName,
				symbol: tokenSymbol,
				hostAddress: HOST_ADDRESS,
				cfaAddress: CFA_ADDRESS,
				acceptedToken: FDAIX_ADDRESS,
			};

			mutate(instanceData);
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
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Create Instance'}
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
							<Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Create Instance'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default CreateInstance;
