# Approve

<p> The `approve` function from `nftGameLibrary` approves another address to spend tokens on the tenant's behalf. </p>

---

<br>

### approve

<p> The `approve` function takes in an address and a token Id. </p>

```jsx
	const approve = async ({ to, tokenId }: { to: string; tokenId: number }) => {
		try {
			const approveTxn = await base.proxyContract?.approve(to, tokenId);
			return approveTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { Approve } from './approve';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/approve.mdx';

export default {
	title: 'Components/Approve',
	component: Approve,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Approve {...args} />
	</HyperverseProvider>
);

export const Address1 = Template.bind({});

Address1.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};

export const Address2 = Template.bind({});

Address2.args = {
	to: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
	tokenId: 1,
};

```

### Main UI Component

```jsx
import { useNFTGame } from "../source";
import { useEvm } from "@decentology/hyperverse-evm";
import "./style.css";

export const Approve = ({ ...props }: { to: string; tokenId: number }) => {
  const { approve } = useNFTGame();
  const { Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
          approve?.(props);
        }}
      >
        Approve
      </button>
    </>
  );
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
