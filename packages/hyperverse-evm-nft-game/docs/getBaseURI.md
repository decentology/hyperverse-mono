# Get Base URI

<p> The `approve` function from `nftGameLibrary` returns the base URI. </p>

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
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getBaseURI.mdx';

export default {
	title: 'Components/GetBaseURI',
	component: GetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetBaseURI>;

const Template: ComponentStoryFn<typeof GetBaseURI>= (args: any) => (
	<HyperverseProvider>
		<GetBaseURI {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetBaseURI = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.getBaseURI) {
			nftGame.getBaseURI().then(setData);
		}
	}, [nftGame.getBaseURI]);

	const checkBaseURI = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Base URI: {checkBaseURI()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
