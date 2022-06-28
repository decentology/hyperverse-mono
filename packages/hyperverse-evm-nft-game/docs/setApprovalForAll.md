# Set Approval for All

<p> The `setApprovalForAll` function from `nftGameLibrary` ... </p>

---

<br>

### setApprovalForAll

<p> The `setApprovalForAll` function takes in ... </p>

```jsx
  const setApprovalForAll = async ({ to, approved }: { to: string; approved: boolean }) => {
    try {
      const setApprovalTxn = await base.proxyContract?.setApprovalForAll(to, approved);
      return setApprovalTxn.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx

import { ApproveAll } from './setApprovalForAll';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setApprovalForAll.mdx';

export default {
	title: 'Components/ApproveAll',
	component: ApproveAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<ApproveAll {...args} />
	</HyperverseProvider>
);

export const Approve = Template.bind({});

Approve.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: true,
};

export const Deny = Template.bind({});

Deny.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: false,
};

```

### Main UI Component

```jsx

import { useNFTGame } from "../source";
import { useEvm } from "@decentology/hyperverse-evm";
import "./style.css";

export const ApproveAll = ({ ...props }: { operator: string; approved: boolean }) => {
  const { setApprovalForAll } = useNFTGame();
  const { Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
          setApprovalForAll?.(props);
        }}
      >
        Approve All
      </button>
    </>
  );
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
