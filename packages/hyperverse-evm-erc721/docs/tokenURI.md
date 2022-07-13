# Token URI

<p> The `tokenURI` function from `erc721Library` allows a tenant to mint an NFT. </p>

---

<br>

### tokenURI

<p> The `tokenURI` function takes in a token ID. </p>

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

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source/react';
import { useEffect, useState } from 'react';

export const TokenURI = ({ ...props }: { tokenId: number }) => {
	const erc721 = useERC721();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc721.tokenURI) {
			erc721.tokenURI?.(props.tokenId).then(setData);
		}
	}, [erc721.getBalanceOf]);
	console.log(props.tokenId)

	const checkURI = () => {
		console.log('in check')
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return <div className="body"> Token URI: {checkURI()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
