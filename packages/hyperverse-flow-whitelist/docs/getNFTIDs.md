# Get NFT IDs

<p> The `getNFTIDs` function from `useWhitelist` returns the ID of an NFT. </p>

---

<br>

### getNFTIDs

<p> The `getNFTIDs` function takes in the tenant ID and the account. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getNFTIDs(tenantId: string, account: string) {
	try {
		const ids = await fcl.send([
			fcl.script`
				import ExampleNFT from 0xNFT
						
				pub fun main(tenantID: Address, account: Address): [UInt64] {
																
						let collection = getAccount(account).getCapability(ExampleNFT.CollectionPublicPath)
																.borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
																?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
				
						return collection.getIDs(tenantID)
				}
      `,
			fcl.args([
				fcl.arg(tenantId, t.Address),
				fcl.arg(account, t.Address)
			]),
		]).then(fcl.decode);

		return ids;
	} catch (error) {
		console.error(error);
	}
}

export { getNFTIDs };
```

### Main UI Component

```jsx

```

### Args

<p> </p>

```jsx

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)