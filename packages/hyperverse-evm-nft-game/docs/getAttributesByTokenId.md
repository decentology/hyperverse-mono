# Get Attributes By Token Id

<p> The `getAttributesByTokenId` function from `nftGameLibrary` returns the attributes of a token. </p>

---

<br>

### getAttributesByTokenId

<p> The `getAttributesByTokenId` function takes in a token Id. </p>

```jsx
	const getAttributesByTokenId = async (tokenId: number) => {
		try {
			const attrs = await base.proxyContract?.getAttributesByTokenId(tokenId);
			return attrs;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetAttributesByTokenId } from './getAttributesByTokenId';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getAttributesByTokenId.mdx';

export default {
	title: 'Components/GetAttributesByTokenId',
	component: GetAttributesByTokenId,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetAttributesByTokenId>;

const Template: ComponentStoryFn<typeof GetAttributesByTokenId> = (args: any) => (
	<HyperverseProvider>
		<GetAttributesByTokenId {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetAttributesByTokenId = ({ ...props }: { tokenId: number }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState('');

	useEffect(() => {
		if (nftGame.getAttributesByTokenId) {
			nftGame.getAttributesByTokenId(props.tokenId).then(setData);
		}
	}, [nftGame.getAttributesByTokenId]);

	const attributeCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Attributes: {attributeCheck()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
