# Transfer From

<p> The `transferFrom` function from `nftGameLibrary` allows the owner to transfer their NFT to another address. </p>

---

<br>

### transferFrom

<p> The `transferFrom` function takes in the address of the sender, the address of the recipient, and the token ID of the NFT being transferred. </p>

```jsx
  const transfer = async ({ from, to, tokenId }: { from: string, to: string; tokenId: number }) => {
    try {
      const transferTxn = await base.proxyContract?.safeTransferFrom(from, to, tokenId);
      return transferTxn.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx
import { TransferFrom } from './transferFrom';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/transferFrom.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/TransferFrom',
	component: TransferFrom,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof TransferFrom>;

export const Demo: ComponentStoryFn<typeof TransferFrom> = (args: any) => (
	<HyperverseProvider>
		<TransferFrom {...args} />
	</HyperverseProvider>
);

Demo.args = {
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TransferFrom = ({ ...props }: { from: string, to: string; tokenId: number }) => {
	const { transferFrom } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					transferFrom!(props);
				}}
			>
				Transfer From
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
