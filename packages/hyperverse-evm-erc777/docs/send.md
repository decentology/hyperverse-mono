# Send

<p> The `send` function from `useERC777` transfers tokens from the token holder's address to another address. </p>

---

<br>

### send

<p> The `send` function takes in the address of the recipient and the amount of tokens being transferred. </p>

```jsx
	const send = async ({ to, amount, data }: { to: string; amount: number; data: string }) => {
		try {
			const transferTxn = await base.proxyContract?.send(
				to,
				amount,
				ethers.utils.formatBytes32String(data)
			);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Send } from './send';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/send.mdx';

export default {
	title: 'Components/Send',
	component: Send,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Send {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 125,
	data: '',
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Send = ({ ...props }: { to: string, amount: number, data: any }) => {
	const { send } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					send(props);
				}}
			>
				Send
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
