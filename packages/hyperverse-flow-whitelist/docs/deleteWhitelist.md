# Delete Whitelist

<p> The `deleteWhitelist` function from `useWhitelist` deletes a whitelist. </p>

---

<br>

### deleteWhitelist

<p> The `deleteWhitelist` functions takes in the `whitelistId` number of the whitelist the user wants to delete. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '../types';

async function deleteWhitelist(whitelistId: number) {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
			import Gateway from 0xGateway

			transaction(whitelistId: UInt64) {

				let Registry: &Gateway.Registry

				prepare(acct: AuthAccount) {
					self.Registry = acct.borrow<&Gateway.Registry>(from: Gateway.RegistryStoragePath)
															?? panic("Could not borrow the Registry from the signer.")
				}

				execute {
					self.Registry.deleteWhitelist(whitelistId: whitelistId)
					log("Removed the Whitelist.")
				}
			}
      `,
			fcl.args([
				fcl.arg(whitelistId, t.UInt64),
			]),
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

export { deleteWhitelist };
```

### Main UI Component

```jsx

```

### Args

<p> </p>

```jsx

```

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
