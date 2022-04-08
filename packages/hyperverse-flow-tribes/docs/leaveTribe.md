# Leave Tribe

<p> The `leaveTribe` function from **Flow Tribes Module** allows a tenant to leave a tribe. </p>

---

<br>

### leaveTribe

<p> The `leaveTribe` function takes in the tenant ID. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '../types';

async function leaveTribe(tenantId: string) {
	try {
		const transactionID = await fcl
			.send([
				fcl.transaction`
      import Tribes from 0xTribes

      transaction(tenantID: Address) {
          let TribesIdentity: &Tribes.Identity
          prepare(signer: AuthAccount) {
              self.TribesIdentity = signer.borrow<&Tribes.Identity>(from: Tribes.IdentityStoragePath)
                                      ?? panic("Could not borrow the Tribes.Identity")
          }
          execute {
              self.TribesIdentity.leaveTribe(tenantID)
              log("This signer left their Tribe.")
          }
      }
      `,
				fcl.args([fcl.arg(tenantId, t.Address)]),
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

export { leaveTribe };
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
