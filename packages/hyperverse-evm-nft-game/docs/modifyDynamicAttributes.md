# Modify Dynamic Attributes

<p> The `modifyDynamicAttributes` function from `nftGameLibrary` allows you to modify the dynamic attributes of your NFT. </p>

---

<br>

### modifyDynamicAttributes

<p> The `modifyDynamicAttributes` function takes in a token Id and attributes. </p>

```jsx
	const modifyDynamicAttributes = async (tokenId: number, attributes: number[]) => { 
		try {
			const tx = await base.proxyContract?.modifyDynamicAttributes(tokenId, attributes);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}
```

### Stories

```jsx
import { ModifyDynamicAttributes } from './modifyDynamicAttributes';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/modifyDynamicAttributes.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/ModifyDynamicAttributes',
	component: ModifyDynamicAttributes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof ModifyDynamicAttributes>;

export const Demo: ComponentStoryFn<typeof ModifyDynamicAttributes> = (args: any) => (
	<HyperverseProvider>
		<ModifyDynamicAttributes {...args} />
	</HyperverseProvider>
);

Demo.args = {
	tokenId: 1,
	attributes: [7, 8, 9],
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const ModifyDynamicAttributes = ({
	...props
}: {
	tokenId: number;
	attributes: number[];
}) => {
	const { modifyDynamicAttributes } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					modifyDynamicAttributes!(props.tokenId, props.attributes);
				}}
			>
				Modify Dynamic Attributes
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
