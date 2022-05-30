# Add Tribe

<p> The `addTribe` function from **Flow Tribes Module** adds a new tribe. </p>

---

<br>

### addTribe

<p> The `addTribe` function takes in the name of the tribe, an ipfsHash value, and a description of the new tribe. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function addTribe(newTribeName: string, ipfsHash: string, description: string) {
	try {
		const transactionID = await fcl
			.send([
				fcl.transaction`
      import Tribes from 0xTribes
      
      transaction(newTribeName: String, ipfsHash: String, description: String) {

        let TribesAdmin: &Tribes.Admin
    
        prepare(tenantOwner: AuthAccount) {
            self.TribesAdmin = tenantOwner.borrow<&Tribes.Admin>(from: Tribes.AdminStoragePath)!
        }
    
        execute {
            self.TribesAdmin.addNewTribe(newTribeName: newTribeName, ipfsHash: ipfsHash, description: description)
            log("This admin has added a new tribe to join.")
        }
    }
      `,
				fcl.args([
					fcl.arg(newTribeName, t.String),
					fcl.arg(ipfsHash, t.String),
					fcl.arg(description, t.String),
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

export { addTribe };
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
