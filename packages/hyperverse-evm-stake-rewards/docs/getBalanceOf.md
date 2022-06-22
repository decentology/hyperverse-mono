# Get Balance Of

<p> The `getBalanceOf` function from `stakeRewardsLibrary` returns the amount a tokens of a provided address. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in an address for the account. </p>

```jsx
	const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
			return BigNumber.from(balance).toNumber();
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetBalanceOf } from './getBalanceOf';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getBalanceOf.mdx';

export default {
	title: 'Components/GetBalanceOf',
	component: GetBalanceOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBalanceOf {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
```

### Main UI Component

```jsx
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (stakeRewards.getBalanceOf) {
			stakeRewards.getBalanceOf(props.account).then(setData);
		}
	}, [stakeRewards.getBalanceOf]);

	const hasBalance = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Balance of <b>{props.account}</b>: {hasBalance()}
		</div>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
