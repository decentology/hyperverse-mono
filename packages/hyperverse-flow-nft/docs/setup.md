# Setup

<p> The `setup` function from the **Flow NFT Module** ... </p>

---

<br>

### setup

<p> The `setup` function ... </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function setup() {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
				import ExampleNFT from 0xNFT
				
				transaction() {
						prepare(signer: AuthAccount) {
								if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
									signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
								  signer.link<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
								}

								if signer.borrow<&ExampleNFT.NFTMinter>(from: ExampleNFT.MinterStoragePath) == nil {
									signer.save(<- ExampleNFT.createMinter(), to: ExampleNFT.MinterStoragePath)
								}
						}
						execute {
								
						}
				}
      `,
			fcl.args([]),
			fcl.payer(fcl.authz),
			fcl.proposer(fcl.authz),
			fcl.authorizations([fcl.authz]),
			fcl.limit(9999),
		])
			.then(fcl.decode);

		return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
	} catch (error) {
		console.error(error);
	}
}

export { setup };

```

### Stories

```jsx

```

### Main UI Component

```jsx

```

### Args

```jsx

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
