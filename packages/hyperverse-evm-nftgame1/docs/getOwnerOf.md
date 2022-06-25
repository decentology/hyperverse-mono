# Get Owner Of

<p> The `getOwnerOf` function from `nftGame1Library` returns the address of a token ID owner. </p>

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
import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: {tokenId: string}) => {
	const nftGame1 = useNFTGame1();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (nftGame1.getOwnerOf) {
			nftGame1.getOwnerOf(props.tokenId).then(setData);
		}
	}, [nftGame1.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error.</p>
		);
	};

	return <div className="ownerOf"> Owner of {props.tokenId}: {owner()}</div>;
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
