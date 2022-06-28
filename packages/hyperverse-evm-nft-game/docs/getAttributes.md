# Get Attributes

<p> The `getAttributes` function from `nftGameLibrary` approves another address to spend tokens on the tenant's behalf. </p>

---

<br>

### getAttributes

<p> The `getAttributes` function takes in a token Id. </p>

```jsx
	const getAttributes = async (tokenId: number) => {
		try {
			const attrs = await base.proxyContract?.getAttributesByTokenId(tokenId);
			return attrs;
		} catch (error) {
			throw error;
		}
	}
```

### Stories

```jsx

import { GetAttributes } from './getAttributes';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getAttributes.mdx';

export default {
	title: 'Components/GetAttributes',
	component: GetAttributes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetAttributes {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};

```

### Main UI Component

```jsx

import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetAttributes = ({ ...props }: { tokenId: number }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (nftGame.getAttributes) {
			nftGame.getAttributes(props.tokenId).then(setData);
		}
	}, [nftGame.getAttributes]);

	const checkAttributes = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Attributes: <b>{}</b> {checkAttributes()}
		</div>
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
