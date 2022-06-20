# Transfer

<p> The `transfer` function from `erc721Library` allows the owner to transfer their NFT to another address. </p>

---

<br>

### transfer

<p> The `transfer` function takes in the address of the sender, the address of the recipient, and the token ID of the NFT being transferred. </p>

```jsx
	const transfer = async ({
		from,
		to,
		tokenId,
	}: {
		from: string;
		to: string;
		tokenId: number;
	}) => {
		try {
			const transferTxn = await base.proxyContract?.transferFrom(from, to, tokenId);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Transfer } from './transfer';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transfer.mdx';

export default {
	title: 'Components/Transfer',
	component: Transfer,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Transfer {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Transfer = ({ ...props }: { from: string; to: string; tokenId: number }) => {
	const { transfer } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					transfer?.(props);
				}}
			>
				Transfer
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
