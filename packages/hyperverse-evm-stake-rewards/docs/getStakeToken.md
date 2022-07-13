# Get Stake Token

<p> The `getStakeToken` function from `stakeRewardsLibrary` returns the stake token. </p>

---

<br>

### getStakeToken

```jsx
	const getStakeToken = async () => {
		try {
			const stakeToken = await base.proxyContract?.stakingToken();
			return stakeToken as string;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetStakeToken } from './getStakeToken';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getStakeToken.mdx';

export default {
	title: 'Components/GetStakeToken',
	component: GetStakeToken,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetStakeToken {...args} />
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

export const GetStakeToken = ({ ...props }) => {
	const { getStakeToken } = useStakeRewards();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getStakeToken?.();
				}}
			>
				Get Stake Tokens
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
