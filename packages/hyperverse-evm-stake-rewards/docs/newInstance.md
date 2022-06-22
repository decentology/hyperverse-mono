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
import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/newInstance.mdx';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} />
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

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useStakeRewards();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance?.({
						account: address!,
						stakeToken: 'STK',
						rewardToken: 'RWD',
						rewardRate: 20,
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
