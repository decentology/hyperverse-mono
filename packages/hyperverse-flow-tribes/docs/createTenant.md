# Create Tenant

<p> The `createTenant` function from **Flow Tribes Module** creates a new tenant. </p>

---

<br>

### createTenant

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function createTenant() {
	try {
		const transactionID = await fcl
			.send([
				fcl.transaction`
      import Tribes from 0xTribes
      
      transaction() {
          prepare(signer: AuthAccount) {
              Tribes.createTenant(newTenant: signer)
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

export { createTenant };

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

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
