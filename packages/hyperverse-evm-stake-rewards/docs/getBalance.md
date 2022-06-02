# Get Balance

<p> The `getBalance` function from `stakeRewardsLibrary` returns the current available balance of the current address. </p>

---

<br>

### getBalance

```jsx
	const getBalance = async () => {
		try {
			const balance = await base.proxyContract?.balance();
			return BigNumber.from(balance).toNumber();
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetBalance } from './getBalance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getBalance.mdx';

export default {
	title: 'Components/GetBalance',
	component: GetBalance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBalance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetBalance = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getBalance) {
			stakeRewards.getBalance().then(setData);
		}
	}, [stakeRewards.getBalance]);

	const hasBalance = () => {
		return data ? <p>{data}</p> : <p>Error.</p>;
	};

	return <div className="balance"> Balance: {hasBalance()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
