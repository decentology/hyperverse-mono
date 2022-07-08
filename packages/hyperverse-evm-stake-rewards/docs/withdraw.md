# Withdraw

<p> The `withdraw` function from `stakeRewardsLibrary` withdraws an amount of tokens. </p>

---

<br>

### withdraw

<p> The `withdraw` function takes in an amount of tokens. </p>

```jsx
	const withdraw = async (amount: number) => {
		try {
			const withdrawTxn = await base.proxyContract?.withdraw(amount);
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
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Withdraw = ({ ...props }: { amount: number }) => {
	const { withdraw } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					withdraw?.(props.amount);
				}}
			>
				Withdraw Tokens
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
