# Get Earned

<p> The `getEarned` function from `stakeRewardsLibrary` returns the amount of tokens earned by a provided address. </p>

---

<br>

### getEarned

<p> The `getEarned` function takes in an address for the account. </p>

```jsx
	const getEarned = async (account: string) => {
		try {
			const earned = await base.proxyContract?.earned(account);
			return BigNumber.from(earned).toNumber();
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetEarned } from './getEarned';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getEarned.mdx';

export default {
	title: 'Components/GetEarned',
	component: GetEarned,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetEarned {...args} />
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

export const GetEarned = ({ ...props }: { account: string }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (stakeRewards.getEarned) {
			stakeRewards.getEarned(props.account).then(setData);
		}
	}, [stakeRewards.getEarned]);

	const hasEarnedTokens = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return <div className="body"> Earned Tokens: {hasEarnedTokens()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
