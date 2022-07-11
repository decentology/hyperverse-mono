# Create Instance

<p> The `createInstance` function from `evmBaseLibrary` allows a user to connect their wallet where they can create a new instance. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in a name for their NFT and a symbol to represent it. </p>

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
import { Story } from '@storybook/react';
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

const Template: Story = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useERC721();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance({ account: address, name: 'TEST', symbol:'TST' });
				}}
			>
				New Instance
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
