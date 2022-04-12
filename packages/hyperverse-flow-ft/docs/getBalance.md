# Get Balance

<p> The `getBalance` function from `useToken` returns the available balance of the sender. </p>

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
				import ExampleToken from 0xToken
						
				pub fun main(tenantID: Address, account: Address): UFix64? {
																
						let vault = getAccount(account).getCapability(ExampleToken.VaultPublicPath)
																.borrow<&ExampleToken.Vault{ExampleToken.VaultPublic}>()
																?? panic("Could not borrow the ExampleToken.Vault{ExampleToken.VaultPublic}")
				
						return vault.getBalance(tenantID)
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
