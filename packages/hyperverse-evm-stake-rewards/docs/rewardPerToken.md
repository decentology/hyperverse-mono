# Reward Per Token

<p> The `rewardPerToken` function from `stakeRewardsLibrary` returns the rate of reward per token. </p>

---

<br>

### rewardPerToken

```jsx
	const rewardPerToken = async () => {
		try {
			const reward = await base.proxyContract?.rewardPerToken();
			return reward.toNumber();
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { RewardPerToken } from './rewardPerToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/rewardPerToken.mdx';

export default {
	title: 'Components/RewardPerToken',
	component: RewardPerToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<RewardPerToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const RewardPerToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState();

	useEffect(() => {
		if (stakeRewards.rewardPerToken) {
			stakeRewards.rewardPerToken().then(setData);
		}
	}, [stakeRewards.rewardPerToken]);

	const hasRewardToken = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(data)}</p>;
	};

	return <div className="body"> Reward per Token: {hasRewardToken()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
