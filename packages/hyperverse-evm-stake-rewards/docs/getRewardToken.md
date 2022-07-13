# Get Reward Token

<p> The `getRewardToken` function from `stakeRewardsLibrary` returns the reward token. </p>

---

<br>

### getRewardToken

```jsx
	const getRewardToken = async () => {
		try {
			const rewardToken = await base.proxyContract?.rewardsToken();
			return rewardToken as string;
		} catch (error) {
			throw error;
		}
	};.
```

### Stories

```jsx
import { GetRewardToken } from './getRewardToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getRewardToken.mdx';

export default {
	title: 'Components/GetRewardToken',
	component: GetRewardToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetRewardToken {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const GetRewardToken = ({ ...props }) => {
	const { getRewardToken } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getRewardToken?.();
				}}
			>
				Get Reward Tokens
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
