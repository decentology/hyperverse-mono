# Get Total Supply

<p> The `getTotalSupply` function from `stakeRewardsLibrary` returns the number of tokens the current address has. </p>

---

<br>

### getTotalSupply

```jsx
	const getTotalSuply = async () => {
		try {
			const totalSupply = await base.proxyContract?.totalSupply();
			return BigNumber.from(totalSupply).toNumber();
		} catch (error) {
			throw error;
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
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (stakeRewards.getTotalSuply) {
			stakeRewards.getTotalSuply().then(setData);
		}
	}, [stakeRewards.getTotalSuply]);

	const hasTokenSupply = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return <div className="body"> Total Supply: {hasTokenSupply()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
