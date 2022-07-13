# Initialize Collection

<p> The `initializeCollection` function from `erc721Library` initializes a collection of ERC721 tokens. </p>

---

<br>

### initializeCollection

<p> The `initializeCollection` function takes in a price, a maximum supply, and a maximum supply per user. </p>

```jsx
	const initializeCollection = async ({price, maxSupply, maxPerUser}: {price: number; maxSupply: number; maxPerUser: number}) => {
		try {
			const tnx = await base.proxyContract?.initializeCollection(
				ethers.utils.parseEther(price.toString()),
				maxSupply,
				maxPerUser
			);
			return tnx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { InitializeCollection } from './initializeCollection';
import { HyperverseProvider } from './utils/Provider';
import { Story } from '@storybook/react';
import { Doc } from '../docs/initializeCollection.mdx';

export default {
	title: 'Components/InitializeCollection',
	component: InitializeCollection,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args) => (
	<HyperverseProvider>
		<InitializeCollection {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    price: 10,
    maxSupply: 50,
    maxPerUser: 5,
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const InitializeCollection = ({
	...props
}: {
	price: number;
	maxSupply: number;
	maxPerUser: number;
}) => {
	const { initializeCollection } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					initializeCollection?.(props);
				}}
			>
				Initialize Collection
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
