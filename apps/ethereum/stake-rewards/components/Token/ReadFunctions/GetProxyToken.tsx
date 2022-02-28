import { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useToken } from '@decentology/hyperverse-ethereum-token';
import { MdFileCopy } from 'react-icons/md';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Button,
} from '../../ComponentStyles';
import { styled } from '@stitches/react';

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
	const { address } = useEthereum();
	const { Proxy } = useToken();
	const { data, refetch } = Proxy();
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
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Get Proxy'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Button
								onClick={() => {
									refetch();
									setHidden(true);
								}}
							>
								{!address
									? 'Connect Wallet'
									: !hidden
									? 'Get Proxy '
									: showInfo}
				
							</Button>
              {hidden && !zeroAddress &&(
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
  }
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  marginTop: '10px',
  justifyContent: 'center',
  alignItems: 'center',
})

const CopyIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
	</svg>
);
