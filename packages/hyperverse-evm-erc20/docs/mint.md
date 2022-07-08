# Mint

<p> The `mint` function from `useERC720` allows a user to mint a new token. </p>

---

<br>

### mint

<p> The `mint` function from `useERC20` mints a number of tokens. </p>

```jsx

	const mint = async (amount: number) => {
		try {
			const mintTxn = await base.proxyContract?.mint(amount);
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
import { Doc } from '../docs/mint.mdx';

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
	amount: 1000,
};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Mint = ({ ...props }: { amount: number }) => {
	const { mint } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mint?.(props.amount);
			}}
		>
			Mint
		</button>
	) : (
		<Connect />
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
