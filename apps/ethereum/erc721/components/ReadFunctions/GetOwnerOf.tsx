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
} from '../ComponentStyles';
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

const GetOwnerOf = () => {
	const { account } = useEthereum();

	const [tokenId, setTokenId] = useState('');

	const erc721 = useERC721();
	const { data, isLoading } = useQuery('ownerOf', () => erc721.getOwnerOf!(tokenId));

	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Owner Of</h4>
			<p>Get the owner of a given tokenId</p>
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
								placeholder="Token Id"
								onChange={(e) => setTokenId(e.target.value)}
							/>

							<Button onClick={() => setHidden((p) => !p)}>
								{!account
									? 'Connect Wallet'
									: isLoading
									? 'fetching ...'
									: !hidden
									? 'Get Owner Of'
									: data ? shortenHash(data.toString(), 4,4) : 'Invalid Token Id'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default GetOwnerOf;
