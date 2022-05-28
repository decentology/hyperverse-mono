import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC721 } from '@decentology/hyperverse-evm-erc721';
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
import { useQuery } from 'react-query';

const shortenHash = (hash: string = '', charLength: number = 6, postCharLength?: number) => {
	let shortendHash;
	if (postCharLength) {
		shortendHash =
			hash.slice(0, charLength) +
			'...' +
			hash.slice(hash.length - postCharLength, hash.length);
	} else {
		shortendHash = hash.slice(0, charLength);
	}
	return shortendHash;
};

const OwnerOf = () => {
	const { account } = useEthereum();
	const erc721 = useERC721();
	const [tokenId, setTokenId] = useState("0");
	const { data } = useQuery('ownerOf', () => erc721.getOwnerOf!(tokenId!));


	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Get Owner Of</h4>
			<p>Get the owner of a tokenId</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Get Owner Of'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								type="number"
								min="0"
								placeholder="TokenId"
								onChange={(e) => setTokenId(e.target.value)}
							/>

							<Button onClick={() => setHidden((p) => !p)}>
								{!account ? 'Connect Wallet' : !hidden ? 'Get Owner Of' : shortenHash(data, 5, 5)}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default OwnerOf;
