# Get Balance

<p> The `getBalance` function from `useWhitelist` returns the available balance of a provided address. </p>

---

<br>

### getBalance

<p> The `getBalance` function takes in the tenant ID and the account. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getBalance(tenantId: string, account: string) {
  console.log(account)
  try {
    const balance = await fcl.send([
      fcl.script`
				import ExampleNFT from 0xNFT
						
				pub fun main(tenantID: Address, account: Address): Int {
																
						let collection = getAccount(account).getCapability(ExampleNFT.CollectionPublicPath)
																.borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
																?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
				
						return collection.getIDs(tenantID).length
				}
      `,
      fcl.args([
        fcl.arg(tenantId, t.Address),
        fcl.arg(account, t.Address)
      ]),
    ]).then(fcl.decode);

    return balance;
  } catch (error) {
    console.error(error);
  }
}

export { getBalance };
```

### Main UI Component

```jsx

```

### Args

<p> </p>

```jsx

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)