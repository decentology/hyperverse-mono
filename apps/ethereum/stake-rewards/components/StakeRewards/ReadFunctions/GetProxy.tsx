import { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-evm-stake-rewards';
import { MdFileCopy } from 'react-icons/md';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Button,
	Module,
} from '../../ComponentStyles';
import { styled } from '@stitches/react';
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

const ProxyToken = () => {
	const [addressCopied, setAddressCopied] = useState<boolean>(false);
	const { account } = useEthereum();
	const stakeRewards = useStakeRewards();

	const { data: instance } = useQuery('checkInstance', () => stakeRewards.checkInstance!(account!));

	const { data, refetch, isLoading } = useQuery('getProxy', () => stakeRewards.getProxy!(account!));

	const [hidden, setHidden] = useState(false);

	const zeroAddress = data === '0x0000000000000000000000000000000000000000';

	const showInfo = !zeroAddress ? shortenHash(data, 5, 5) : 'You need an instance';

	useEffect(() => {
		if (addressCopied === true) {
			setTimeout(() => setAddressCopied(false), 5000);
		}
	}, [addressCopied]);

	return (
		<Box>
			<h4>Get Proxy Stake Rewards</h4>
			<p>Get your proxy contract address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Get Proxy'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Button
								disabled={!account || !instance}
								onClick={() => {
									refetch();
									setHidden(true);
								}}
							>
								{!account
									? 'Connect Wallet'
									: !instance
									? 'You need an instance'
									: isLoading
									? 'fetching ...'
									: !hidden
									? 'Get Proxy'
									: showInfo}
							</Button>
							{hidden && !zeroAddress && (
								<CopyButton
									onClick={() => {
										navigator.clipboard.writeText(data);
										setAddressCopied(true);
									}}
								>
									{!addressCopied ? <MdFileCopy /> : ''}
								</CopyButton>
							)}
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default ProxyToken;

const CopyButton = styled('button', {
	margin: '10px 0 -5px 2px',
	backgroundColor: 'transparent',
	outline: 'none',
	border: 'none',
	color: '$yellow100',
	cursor: 'pointer',
	'&:hover': {
		opacity: 0.8,
	},
});

const Content = styled('div', {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	marginTop: '10px',
	justifyContent: 'center',
	alignItems: 'center',
});

const CopyIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
	</svg>
);
