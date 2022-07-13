# Set Base URI

<p> The `setBaseURI` function from `nftGameLibrary` sets the base URI. </p>

---

<br>

### setBaseURI

<p> The `setBaseURI` function takes a url for the base URI. </p>

```jsx
	const setBaseURI = async (baseURI: string) => {
		try {
			const setBaseURITxn = await base.proxyContract?.setBaseURI(baseURI);
			return setBaseURITxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setBaseURI.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetBaseURI>;

export const Demo: ComponentStoryFn<typeof SetBaseURI> = (args: any) => (
	<HyperverseProvider>
		<SetBaseURI {...args} />
	</HyperverseProvider>
);

Demo.args = {
	baseURI: 'https://site-1.com/',
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetBaseURI = ({ ...props }: { baseURI: string }) => {
	const { setBaseURI } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setBaseURI!(props.baseURI);
				}}
			>
				Set Base URI
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
