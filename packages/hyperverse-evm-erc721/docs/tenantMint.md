# Tenant Mint

<p> The `tenantMint` function from `erc721Library` allows a tenant to mint an NFT. </p>

---

<br>

### tenantMint

<p> The `tenantMint` function takes in an image and a target address. </p>

```jsx
	const tenantMint = async ({ image, to }: { image?: File; to: string }) => {
		try {
			const erc72Name = await base.proxyContract?.name();
			if (image) {
				const tokenUri = await hyperverse.storage?.uploadFile(image);
				const Metadata = {
					image: `https://ipfs.io/ipfs/${tokenUri}`,
					name: `${erc72Name}`,
				};
				const metadataFile = new File([JSON.stringify(Metadata)], 'metadata.json');
				const metadataFileLink = await hyperverse!.storage!.uploadFile(metadataFile);

				const mintTxn = await base.proxyContract?.['tenantMint(address,string)'](
					to,
					metadataFileLink,
					{
						gasLimit: '1000000',
					}
				);
				return mintTxn.wait() as TransactionReceipt;
			} else {
				const mintTxn = await base.proxyContract?.['tenantMint(address)'](to);
				return mintTxn.wait() as TransactionReceipt;
			}
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
import { Doc } from '../docs/tenantMint.mdx';

export default {
	title: 'Components/TenantMint',
	component: TenantMint,
	argTypes: {
		image: { control: { type: 'file', accept: '.png' } },
	},
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TenantMint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	image: File,
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useCallback, useRef } from 'react';
import './style.css';

export const TenantMint = ({ ...props }: { to: string; image: File }) => {
	const { tenantMint, error } = useERC721();
	const { address, Connect } = useEvm();
	const imageRef = useRef(null);

	const uploadFile = useCallback(async () => {
		const resp = await fetch(props.to || imageRef.current.src);
		const blob = await resp.blob();
		const file = new File([blob], 'hyperverse-logo.png', { type: 'image/png' });
		const result = await tenantMint?.({
			to: props.to,
			image: props.image,
		});
		console.log('Result', result);
	}, [tenantMint]);

	return error != null ? (
		<div>Error</div>
	) : (
		<>
			<img
				id="hyperverse-logo"
				ref={imageRef}
				style={{ display: 'none' }}
				src={require('./assets/hyperverse-logo.png')}
			/>
			{address ? (
				<button
					type="button"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'blue' }}
					onClick={uploadFile}
				>
					Tenant Mint
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
