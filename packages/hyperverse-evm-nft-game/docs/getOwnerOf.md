# Get Owner Of

<p> The `getOwnerOf` function from `nftGameLibrary` returns the address of a token Id owner. </p>

---

<br>

### getOwnerOf

<p> The `getOwnerOf` function takes in a token Id. </p>

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
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/GetOwnerOf',
	component: GetOwnerOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetOwnerOf>;

const Template: ComponentStoryFn<typeof GetOwnerOf>= (args: any) => (
	<HyperverseProvider>
		<GetOwnerOf {...args} />
	</HyperverseProvider>
);

export const Token1 = Template.bind({});

Token1.args = {
	tokenId: '1',
};

export const Token2 = Template.bind({});

Token2.args = {
	tokenId: '2',
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: { tokenId: string}) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.getOwnerOf) {
			nftGame.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, nftGame.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{JSON.stringify(nftGame.error)}</p>
		);
	};

	return <div className="body"> Owner of token {props.tokenId}: {owner()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
