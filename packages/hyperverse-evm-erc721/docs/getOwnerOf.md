# Get Owner Of

<p> The `getOwnerOf` function from `erc721Library` returns the address of a token ID owner. </p>

---

<br>

### getOwnerOf

<p> The `getOwnerOf` function takes in a token ID. </p>

```jsx
  const getOwnerOf = async (tokenId: string) => {
    try {
      const owner = await base.proxyContract?.ownerOf(tokenId);
      return owner;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx
import { GetOwnerOf } from './getOwnerOf';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getOwnerOf.mdx';

export default {
	title: 'Components/GetOwnerOf',
	component: GetOwnerOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetOwnerOf {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetOwnerOf = ({ ...props }: {account: string, tokenId: string}) => {
	const erc721 = useERC721();
	const [data, setData] = useState(props.account);

	useEffect(() => {
		if (erc721.getOwnerOf) {
			erc721.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, props.account, erc721.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{erc721.error}</p>
		);
	};

	return <div className="body"> Owner of token <b>{props.tokenId}</b>: {owner()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
