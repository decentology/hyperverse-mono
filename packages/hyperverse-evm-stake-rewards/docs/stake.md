# Stake

<p> The `stake` function from `stakeRewardsLibrary` stakes an amount of tokens decided by the user. </p>

---

<br>

### stake

<p> The `stake` function takes in the amount of tokens. </p>

```jsx
	const stake = async (amount: number) => {
		try {
			const stakeTxn = await base.proxyContract?.stake(amount);
			return stakeTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { StakeTokens } from './stake';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/stake.mdx';

export default {
	title: 'Components/StakeTokens',
	component: StakeTokens,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<StakeTokens {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	amount: 10000,
};
```

### Main UI Component

```jsx
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const StakeTokens = ({ ...props }: { amount: number }) => {
	const { stake } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					stake?.(props.amount);
				}}
			>
				Stake Tokens
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
