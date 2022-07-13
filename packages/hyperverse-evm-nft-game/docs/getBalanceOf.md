# Get Balance Of

<p> The `getBalanceOf` function from `nftGameLibrary` returns the current available balance of a provided address. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in an account. </p>

```jsx
	const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
			return BigNumber.from(balance) as BigNumber;
		} catch (error) {
			throw error;
		}
	};
```

### Stories
```jsx
import { GetBalanceOf } from './getBalanceOf';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Doc from '../docs/getBalanceOf.mdx';

export default {
	title: 'Components/GetBalanceOf',
	component: GetBalanceOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetBalanceOf>;

const Template: ComponentStoryFn<typeof GetBalanceOf>= (args: any) => (
	<HyperverseProvider>
		<GetBalanceOf {...args} />
	</HyperverseProvider>
);

export const Account1 = Template.bind({});

Account1.args = {
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
};

export const Account2 = Template.bind({});

Account2.args = {
	account: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc'
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: {account: string}) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (nftGame.getBalanceOf) {
			nftGame.getBalanceOf(props.account).then(setData);
		}
	}, [nftGame.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{JSON.stringify(nftGame.error)}</p>
		);
	};

	return <div className="body"> Balance of: {props.account} {balanceAvailable()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
