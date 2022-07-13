# Withdraw

<p> The `withdraw` function from `nftGameLibrary` allows the user to withdraw their tokens. </p>

---

<br>

### withdraw

```jsx
	const withdraw = async () => {
		try {
			const withdrawTxn = await base.proxyContract?.withdraw();
			return withdrawTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Withdraw } from './withdraw';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/withdraw.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/Withdraw',
	component: Withdraw,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof Withdraw>;

export const Demo: ComponentStoryFn<typeof Withdraw> = (args: any) => (
	<HyperverseProvider>
		<Withdraw {...args} />
	</HyperverseProvider>
);

Demo.args = {};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Withdraw = ({ ...props }) => {
	const { withdraw } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					withdraw!();
				}}
			>
				Withdraw
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
