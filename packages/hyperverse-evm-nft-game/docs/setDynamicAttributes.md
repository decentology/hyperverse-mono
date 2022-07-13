# Set Dynamic Attributes

<p> The `setDynamicAttributes` function from `nftGameLibrary` sets the attributes of your NFT. </p>

---

<br>

### setDynamicAttributes

<p> The `setDynamicAttributes` function takes in a token Id and attributes. </p>

```jsx
	const setDynamicAttributes = async (tokenId: number, attributes: number[]) => { 
		try {
			const tx = await base.proxyContract?.setDynamicAttributes(tokenId, attributes);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}
```

### Stories

```jsx
import { SetDynamicAttributes } from './setDynamicAttributes';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setDynamicAttributes.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetDynamicAttributes',
	component: SetDynamicAttributes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetDynamicAttributes>;

export const Demo: ComponentStoryFn<typeof SetDynamicAttributes> = (args: any) => (
	<HyperverseProvider>
		<SetDynamicAttributes {...args} />
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

export const SetDynamicAttributes = ({ ...props }: { tokenId: number; attributes: number[] }) => {
	const { setDynamicAttributes } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setDynamicAttributes!(props.tokenId, props.attributes);
				}}
			>
				Set Dynamic Attributes
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
