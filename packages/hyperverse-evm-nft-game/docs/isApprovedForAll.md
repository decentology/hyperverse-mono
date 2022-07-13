# Is Approved For All

<p> The `isApprovedForAll` function from `nftGameLibrary` returns the symbol of a token. </p>

---

<br>

### isApprovedForAll

<p> The `isApprovedForAll` function takes in an owner and an operator. </p>

```jsx
	const isApprovedForAll = async ({owner, operator}: {owner: string, operator:string}) => {
		try {
			const isApprovedForAll = await base.proxyContract?.isApprovedForAll(owner, operator);
			return isApprovedForAll;
		} catch (error) {
			throw error;
		}
	}
```

### Stories

```jsx
import { IsApprovedForAll } from './isApprovedForAll';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/isApprovedForAll.mdx';

export default {
	title: 'Components/IsApprovedForAll',
	component: IsApprovedForAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof IsApprovedForAll>;

const Template: ComponentStoryFn<typeof IsApprovedForAll> = (args: any) => (
	<HyperverseProvider>
		<IsApprovedForAll {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const IsApprovedForAll = ({ ...props }: { owner: string; operator: string }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.isApprovedForAll) {
			nftGame.isApprovedForAll(props).then(setData);
		}
	}, [nftGame.isApprovedForAll]);

	const approveCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Is Approved For All: {approveCheck()}
		</div>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
