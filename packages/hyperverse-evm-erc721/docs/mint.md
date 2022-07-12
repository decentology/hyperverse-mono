# Mint

<p> The `mint` function from `erc721Library` allows a user to mint their own NFT. </p>

---

<br>

### mint

<p> The `mint` function takes in a target address and an optional amount. </p>

```jsx
	const mint = async (to: string, amount?: number) => {
		try {
			if (!amount || amount == 1) {
				const mintTxn = await base.proxyContract?.mint(to);
				return mintTxn.wait() as TransactionReceipt;
			}

			const mintTxn = await base.proxyContract?.mintBatch(to, amount);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Mint } from './mint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/mint.mdx';

export default {
	title: 'Components/Mint',
	component: Mint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Mint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 5,
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const Mint = ({ ...props }: { to: string; amount: number }) => {
	const { mint } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					mint?.(props.to, props.amount);
				}}
			>
				Mint
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
