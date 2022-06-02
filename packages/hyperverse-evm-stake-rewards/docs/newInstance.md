# Create Instance

<p> The `createInstance` function from `stakeRewardsLibrary` allows a user to connect their wallet where they can create a new instance. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in the account, the staking token, the rewards token, and the rewards rate. </p>

```jsx
	const createInstance = async ({
		account,
		...args
	}: {
		account: string;
		[key: string]: any;
	}) => {
		try {
			const createTxn = await factoryContract.createInstance(account, ...Object.values(args));
			return createTxn.wait();
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};
```

### Stories

```jsx
import { GetTotalSupply } from './getTotalSupply';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTotalSupply.mdx';

export default {
	title: 'Components/GetTotalSupply',
	component: GetTotalSupply,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTotalSupply {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getTotalSuply) {
			stakeRewards.getTotalSuply().then(setData);
		}
	}, [stakeRewards.getTotalSuply]);

	const hasTokenSupply = () => {
		return data ? <p>{data}</p> : <p>Error.</p>;
	};

	return <div className="totalSupply"> Total Supply: {hasTokenSupply()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
