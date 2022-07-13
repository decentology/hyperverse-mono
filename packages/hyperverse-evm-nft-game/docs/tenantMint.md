# Tenant Mint
<p> The `tenantMint` function from `nftGameLibrary` allows a tenant to mint their own NFT. </p>

---

<br>

### tenantMint

<p> The `tenantMint` function takes in a target address, a token name, a token symbol, values for the eyeId, mouthId, and bodyId, the level, and attributes for the standardChoices, standardOptions, specialChoices, specialOptions,. </p>

```jsx
	const tenantMint = async ({
		to,
		tokenName,
		eyeId,
		mouthId,
		bodyId,
		level,
		standardChoices,
		standardOptions,
		specialChoices,
		specialOptions
	}: MintType) => {
		try {
			const mintTxn = await base.proxyContract?.tenantMint(
				to,
				tokenName,
				eyeId,
				mouthId,
				bodyId,
				level,
				standardChoices,
				standardOptions,
				specialChoices,
				specialOptions
			);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { TenantMint } from './tenantMint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/mint.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/TenantMint',
	component: TenantMint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof TenantMint>;

const Template: ComponentStoryFn<typeof TenantMint> = (args: any) => (
	<HyperverseProvider>
		<TenantMint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenName: 'test',
	eyeId: 1,
	mouthId: 2,
	bodyId: 3,
	level: 1,
	standardChoices: [3, 4, 5],
	standardOptions: [3, 4, 5],
	specialChoices: [3, 4, 5],
	specialOptions: [3, 4, 5],
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TenantMint = ({
	...props
}: {
	to: string;
	tokenName: string;
	eyeId: number;
	mouthId: number;
	bodyId: number;
	level: number;
	standardChoices: number[];
	standardOptions: number[];
	specialChoices: number[];
	specialOptions: number[];
}) => {
	const { tenantMint } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					tenantMint!(props);
				}}
			>
				Tenant Mint
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
