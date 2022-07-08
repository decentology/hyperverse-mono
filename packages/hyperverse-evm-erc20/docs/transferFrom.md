# Transfer From

<p> The `transferFrom` function from `useERC20` transfers tokens from one address to another. </p>

---

<br>

### transferFrom

<p> The `transferFrom` function takes in an address for the sender, an address for the recipient, and a number of tokens. </p>

```jsx

	const transferFrom = async ({
		from,
		to,
		amount,
	}: {
		from: string;
		to: string;
		amount: number;
	}) => {
		try {
			const transferTxn = await base.proxyContract?.transferFrom(from, to, amount);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

```

### Stories

```jsx

import { TransferFrom } from './transferFrom';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/transferFrom.mdx';

export default {
	title: 'Components/TransferFrom',
	component: TransferFrom,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TransferFrom {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	from: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
	amount: 15,
};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TransferFrom = ({ ...props }: { from: string; to: string; amount: number }) => {
	const { transferFrom } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				transferFrom?.(props);
			}}
		>
			Transfer From
		</button>
	) : (
		<Connect />
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
