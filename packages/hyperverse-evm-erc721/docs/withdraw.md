# Withdraw

<p> The `withdraw` function from `erc721Library` allows the current address to withdraw their tokens. </p>

---

<br>

### withdraw

```jsx
	const withdraw = async () => {
		try {
			const withdrawTxn = await base.proxyContract?.withdraw();
			return withdrawTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Withdraw } from './withdraw';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/withdraw.mdx';

export default {
	title: 'Components/Withdraw',
	component: Withdraw,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Withdraw {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const Withdraw = ({ ...props }) => {
	const { withdraw } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					withdraw?.();
				}}
			>
				Withdraw
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
