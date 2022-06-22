# Get Base URI

<p> The `getBalanceOf` function from `erc721Library` returns the base URI. </p>

---

<br>

### getBaseURI

```jsx
	const getBaseURI = async () => {
		try {
			const baseURI = await base.proxyContract?.getBaseURI();
			return baseURI;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetBaseURI } from './getBaseURI';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getBaseURI.mdx';

export default {
	title: 'Components/GetBaseURI',
	component: GetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBaseURI {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEffect, useState } from 'react';

export const GetBaseURI = ({ ...props }) => {
	const erc721 = useERC721();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getBaseURI) {
			erc721.getBaseURI?.().then(setData);
		}
	}, [erc721.getBalanceOf]);

	const baseURI = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return <div className="body"> Base URI: {baseURI()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
