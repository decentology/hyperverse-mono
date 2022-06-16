import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
import {
	Box,
	Item,
	Button,
	TriggerContainer,
	Trigger,
	Parameters,
	Content,
	Input,
} from '../ComponentStyles';
import { useMutation } from 'react-query';

const TogglePublicMint = () => {
	const { account } = useEthereum();

	const erc721 = useERC721();
	const [boolMint, setBoolMint] = useState<string>('false');

	const { mutate, isLoading } = useMutation('togglePublicMint', erc721.togglePublicMint);

	const publicMint = async () => {
		try {
			mutate(boolMint === 'true' ? true : false);
		} catch (error) {
			console.log('e', error);
			throw error;
		}
	};

	return (
		<Box>
		<h4>Toggle Public Mint</h4>
		<p>Toggle Public Mint to activate or deactivate</p>
		<Accordion.Root type="single" collapsible>
			<Item value="item-1">
				<TriggerContainer>
					<Trigger disabled={!account}>
						{!account ? 'Connect Wallet' : 'Toggle Public Mint'}
					</Trigger>
				</TriggerContainer>
				<Parameters>
					<Content>
						<select value={boolMint} onChange={(e) => setBoolMint(e.target.value)}>
							<option value="true">True</option>
							<option value="false">False</option>
						</select>
						<Button onClick={publicMint}>
							{!account
								? 'Connet Wallet'
								: isLoading
								? 'txn loading ...'
								: 'Toggle Public Mint'}
						</Button>
					</Content>
				</Parameters>
			</Item>
		</Accordion.Root>
	</Box>
	);
};

export default TogglePublicMint;
