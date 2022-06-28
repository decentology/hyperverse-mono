# Tenant Mint

<p> The `tenantMint` function from `nftGameLibrary` allows the tenant to mint their own NFT. </p>

---

<br>

### tenantMint

<p> The `tenantMint` function takes in a target address, a token name, and Id values for the eyeId, mouthId, and bodyId. </p>

```jsx
	const tenantMint = async ({ to, tokenName, eyeId, mouthId, bodyId }: MintType) => {
		try {
			const mintTxn = await base.proxyContract?.tenantMint(to, tokenName, eyeId, mouthId, bodyId);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx

import { TenantMint } from './tenantMint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/tenantMint.mdx';

export default {
	title: 'Components/TenantMint',
	component: TenantMint,
	argTypes: {
		image: { control: { type: 'file', accept: '.png' } },
	},
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TenantMint {...args} />
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
import { useCallback, useRef } from "react";
import "./style.css";

export const TenantMint = ({
  ...props
}: {
  to: string;
  tokenName: string;
  eyeId: number;
  mouthId: number;
  bodyId: number;
}) => {
  const { tenantMint, error } = useNFTGame();
  const { address, Connect } = useEvm();
  const imageRef = useRef(null);

  const uploadFile = useCallback(async () => {
    const resp = await fetch(props.to || imageRef.current.src);
    const blob = await resp.blob();
    const file = new File([blob], "hyperverse-logo.png", { type: "image/png" });
    const result = await tenantMint?.({
      to: props.to,
      tokenName: props.tokenName,
      eyeId: props.eyeId,
      mouthId: props.mouthId,
      bodyId: props.bodyId,
    });
    console.log("Result", result);
  }, [tenantMint]);

  return error != null ? (
    <div>Error</div>
  ) : (
    <>
      <img
        id="hyperverse-logo"
        ref={imageRef}
        style={{ display: "none" }}
        src={require("./assets/hyperverse-logo.png")}
      />
      {address ? (
        <button
          type="button"
          className={["storybook-button", `storybook-button--large`].join(" ")}
          style={{ color: "blue" }}
          onClick={uploadFile}
        >
          Tenant Mint
        </button>
      ) : (
        <Connect />
      )}
    </>
  );
};


```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
