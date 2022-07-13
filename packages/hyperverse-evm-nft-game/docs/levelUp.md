# Level Up

<p> The `levelUp` function from `nftGameLibrary` allows your address to level up in the game. </p>

---

<br>

### levelUp

<p> The `levelUp` function takes in a token Id. </p>

```jsx
	const levelUp = async(tokenId: number) => {
		try {
			const toggleTxn = await base.proxyContract?.levelUp(tokenId);
			return toggleTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}
```

### Stories
```jsx
import { LevelUp } from './levelUp';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/levelUp.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/LevelUp',
	component: LevelUp,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof LevelUp>;

export const Demo: ComponentStoryFn<typeof LevelUp> = (args: any) => (
	<HyperverseProvider>
		<LevelUp {...args} />
	</HyperverseProvider>
);

Demo.args = {
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const LevelUp = ({ ...props }: { tokenId: number }) => {
	const { levelUp } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					levelUp!(props.tokenId);
				}}
			>
				Level Up
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
