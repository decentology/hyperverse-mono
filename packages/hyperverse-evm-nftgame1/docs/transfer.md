# Transfer

<p> The `transfer` function from `nftGame1Library` allows the owner to transfer their NFT to another address. </p>

---

<br>

### transfer

<p> The `transfer` function takes in the address of the sender, the address of the recipient, and the token ID of the NFT being transferred. </p>

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

```

### Main UI Component

```jsx
import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Transfer = ({ ...props }: { from: string; to: string; tokenId: number }) => {
	const { transfer } = useNFTGame1();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					transfer(props);
				}}
			>
				Transfer
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
