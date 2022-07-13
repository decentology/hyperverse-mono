# Get Symbol

<p> The `getSymbol` function from `nftGameLibrary` returns the symbol of a token. </p>

---

<br>

### getSymbol

```jsx
	const getSymbol = async () => {
		try {
			const name = (await base.proxyContract?.symbol()) as string;
			return name;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetSymbol } from './getSymbol';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getSymbol.mdx';

export default {
	title: 'Components/GetSymbol',
	component: GetSymbol,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetSymbol>;

const Template: ComponentStoryFn<typeof GetSymbol>= (args: any) => (
	<HyperverseProvider>
		<GetSymbol {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetSymbol = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState('');

	useEffect(() => {
		if (nftGame.getSymbol) {
			nftGame.getSymbol().then(setData);
		}
	}, [nftGame.getSymbol]);

	const symbolCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Symbol: {symbolCheck()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
