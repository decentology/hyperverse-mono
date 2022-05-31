# Mint NFT

<p> The `mintNFT` function from `erc721Library` allows a user to create their own NFT. </p>

---

<br>

### mintNFT

<p> The `mintNFT` function takes in a target address. </p>

```jsx
  const mint = async(to: string) => {
    try {
      const mintTxn = await base.proxyContract?.mint(to);
      return mintTxn.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx
import { MintNFT } from './mintNFT';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/mintNFT.mdx';

export default {
	title: 'Components/MintNFT',
	component: MintNFT,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<MintNFT {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const MintNFT = ({ ...props }: {to: string}) => {
	const { mint } = useERC721();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mint(props.to);
			}}
		>
			Mint NFT
		</button>
	) : (
		<Connect />
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
