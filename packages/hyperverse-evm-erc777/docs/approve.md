# Approve

<p> The `approve` function from `useERC777` approves an allowance of token(s) for the spender. </p>

---

<br>

### approve

<p> The `approve` function takes in the spender and the allowance amount. </p>

```jsx
	const approve = async ({ spender, amount }: { spender: string; amount: number }) => {
		try {
			const approveTxn = await base.proxyContract?.approve(spender, amount);
			return approveTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Approve } from './approve';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/approve.mdx';

export default {
	title: 'Components/Approve',
	component: Approve,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Approve {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	spender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 100,
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const Approve = ({ ...props }: { spender: string, amount: number }) => {
	const { approve } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					approve(props);
				}}
			>
				Approve
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
