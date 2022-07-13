# Withdraw Tokens

<p> The `withdrawTokens` function from `nftGameLibrary` allows the user to withdraw their tokens. </p>

---

<br>

### withdrawTokens

```jsx
	const withdrawTokens = async () => { 
		try {
			const tx = await base.proxyContract?.withdrawTokens();
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}
```

### Stories

```jsx
import { WithdrawTokens } from './withdrawTokens';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/withdrawTokens.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/WithdrawTokens',
	component: WithdrawTokens,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof WithdrawTokens>;

export const Demo: ComponentStoryFn<typeof WithdrawTokens> = (args: any) => (
	<HyperverseProvider>
		<WithdrawTokens {...args} />
	</HyperverseProvider>
);

Demo.args = {};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const WithdrawTokens = ({ ...props }) => {
	const { withdrawTokens } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					withdrawTokens!();
				}}
			>
				Withdraw Tokens
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
