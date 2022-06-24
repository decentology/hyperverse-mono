# Burn

<p> The `burn` function from `useERC20` allows a user to remove a token from circulation. </p>

---

<br>

### burn

<p> The `burn` function takes in an amount of tokens to remove. </p>

```jsx

	const burn = async (amount: number) => {
		try {
			const burnTxn = await base.proxyContract?.burn(amount);
			return burnTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
	
```

### Stories

```jsx

import { Burn } from './burn';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/burn.mdx';

export default {
	title: 'Components/Burn',
	component: Burn,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Burn {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	amount: 10,
};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Burn = ({ ...props }: { amount: number }) => {
	const { burn } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				burn?.(props.amount);
			}}
		>
			Burn
		</button>
	) : (
		<Connect />
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
