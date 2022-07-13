# Get Name

<p> The `getName` function from `nftGameLibrary` returns the name of the token. </p>

---

<br>

### getName

```jsx
	const getName = async () => {
		try {
			const name = (await base.proxyContract?.name()) as string;
			return name;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetName } from './getName';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getName.mdx';

export default {
	title: 'Components/GetName',
	component: GetName,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetName>;

const Template: ComponentStoryFn<typeof GetName>= (args: any) => (
	<HyperverseProvider>
		<GetName {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetName = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState('');

	useEffect(() => {
		if (nftGame.getName) {
			nftGame.getName().then(setData);
		}
	}, [nftGame.getName]);

	const nameCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Name: {nameCheck()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
