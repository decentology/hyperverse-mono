import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
import {
	Box,
	Item,
	Button,
} from '../ComponentStyles';
import { useMutation } from 'react-query';

const TogglePublicMint = () => {
	const { account } = useEthereum();

	const erc721 = useERC721();
	const { mutate, isLoading } = useMutation('togglePublicMint', erc721.togglePublicMint);




	return (
		<Box>
			<h4>Toggle Public Mint</h4>
			<p>Set minting permission</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">

				<Button onClick={() => 	mutate()}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Toggle Public Mint'}
							</Button>

				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default TogglePublicMint;
