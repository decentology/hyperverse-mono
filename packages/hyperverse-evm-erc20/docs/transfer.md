# Transfer

<p> The `transfer` function from `useERC20` allows the owner to transfer their token(s) to another address. </p>

---

<br>

### transfer

<p> The `transfer` function takes in the address of the recipient and the number of tokens being transferred. </p>

```jsx

	const transfer = async ({ to, amount }: { to: string; amount: number }) => {
		try {
			const transferTxn = await base.proxyContract?.transfer(to, amount);
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
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 20,
};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Transfer = ({ ...props }: { to: string; amount: number }) => {
	const { transfer } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
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
	) : (
		<Connect />
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
