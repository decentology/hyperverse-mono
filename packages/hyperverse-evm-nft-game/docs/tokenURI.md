# Token URI

<p> The `tokenURI` function from `nftGameLibrary` returns the token URI for a given token. </p>

---

<br>

### tokenURI

<p> The `tokenURI` function takes in a token Id. </p>

```jsx
	const tokenURI = async (tokenId: number) => {
		try {
			const tokenURI = await base.proxyContract?.tokenURI(tokenId);
			return tokenURI;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx

import { TokenURI } from './tokenURI';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/tokenURI.mdx';

export default {
	title: 'Components/TokenURI',
	component: TokenURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TokenURI {...args} />
	</HyperverseProvider>
);

export const Token1 = Template.bind({});

Token1.args = {
	tokenId: 1,
};

export const Token2 = Template.bind({});

Token2.args = {
	tokenId: 2,
};

```

### Main UI Component

```jsx

import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';

export const TokenURI = ({ ...props }: { tokenId: number }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.tokenURI) {
			nftGame.tokenURI?.(props.tokenId).then(setData);
		}
	}, [nftGame.getBalanceOf]);

	const checkURI = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Token URI: {checkURI()}</div>;
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
