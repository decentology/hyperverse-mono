# Mint

<p> The `mint` function from `nftGameLibrary` allows a user to mint their own NFT. </p>

---

<br>

### mint

<p> The `mint` function takes in a target address, a token name, and Id values for the eyeId, mouthId, and bodyId. </p>

```jsx
	const mint = async ({ to, tokenName, eyeId, mouthId, bodyId }: MintType) => {
		try {
			const mintTxn = await base.proxyContract?.mint(to, tokenName, eyeId, mouthId, bodyId);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx

import { Mint } from './mint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/mint.mdx';

export default {
	title: 'Components/Mint',
	component: Mint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Mint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenName: 'Test',
	eyeId: 1,
	mouthId: 2,
	bodyId: 3,
};

```

### Main UI Component

```jsx

import { useNFTGame } from "../source";
import { useEvm } from "@decentology/hyperverse-evm";
import "./style.css";

export const Mint = ({
  ...props
}: {
  to: string;
  tokenName: string;
  eyeId: number;
  mouthId: number;
  bodyId: number;
}) => {
  const { mint } = useNFTGame();
  const { Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
          mint?.(props);
        }}
      >
        Mint
      </button>
    </>
  );
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
