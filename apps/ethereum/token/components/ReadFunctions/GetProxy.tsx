import { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useERC20 } from '@decentology/hyperverse-evm-erc20/react';
import { MdFileCopy } from 'react-icons/md';
import { Box } from '../ComponentStyles';
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
	const erc20 = useERC20();
	const { data: instance } = useQuery('checkInstance', () => erc20.checkInstance!(account!));

	const { data, isLoading } = useQuery('getProxy', () => erc20.getProxy!(account!));

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
			<h4>Get Proxy Token</h4>
			<p>Get your proxy contract address</p>
			<Content>
				<Button disabled={!account || !instance} onClick={() => setHidden((p) => !p)}>
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
		</Box>
	);
};

export default ProxyToken;

export const Button = styled('button', {
	minWidth: '150px',
	backgroundColor: '$yellow100',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',
	'&:hover': {
		opacity: 0.8,
	},
});

const CopyButton = styled('button', {
	backgroundColor: 'transparent',
	marginLeft: '5px',
	outline: 'none',
	border: 'none',
	color: '$yellow100',
	cursor: 'pointer',
	'&:hover': {
		opacity: 0.8,
	},
});

const Content = styled('div', {
	margin: '10px auto -5px',
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	marginTop: '10px',
	justifyContent: 'center',
	alignItems: 'center',
});
