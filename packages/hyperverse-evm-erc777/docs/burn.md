# Burn

<p> The `burn` function from `useERC777` allows a user to remove an amount of tokens from the total supply. </p>

---

<br>

### burn

<p> The `burn` function takes in an amount of tokens to remove. </p>

```jsx
	const burn = async ({ amount, data }: { amount: number; data: string }) => {
		try {
			const burnTxn = await base.proxyContract?.burn(
				amount,
				ethers.utils.formatBytes32String(data)
			);
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
import Doc from '../docs/burn.mdx';

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
	amount: 20,
	data: '',
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Burn = ({ ...props }: { amount: number, data: string }) => {
	const { burn } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					burn(props);
				}}
			>
				Burn Tokens
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
