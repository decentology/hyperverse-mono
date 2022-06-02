# Claim Reward

<p> The `claimReward` function from `stakeRewardsLibrary` claims the amount of tokens awarded to your account. </p>

---

<br>

### claimReward

```jsx
	const claimReward = async () => {
		try {
			const reward = await base.proxyContract?.claimReward();
			return BigNumber.from(reward).toNumber();
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { ClaimReward } from './claimReward';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/claimReward.mdx';

export default {
	title: 'Components/ClaimReward',
	component: ClaimReward,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<ClaimReward {...args} />
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

export const ClaimReward = ({ ...props }) => {
	const { claimReward } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					claimReward();
				}}
			>
				Claim Token Rewards
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
