# Get All Tribes

<p> The `getAllTribes` function from **Flow Tribes Module** returns all tribes. </p>

---

<br>

### getAllTribes

<p> The `getAllTribes` function takes in the tenant ID. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { TribesData } from '../types';

async function getAllTribes(tenantId: string) {
	try {
		const allTribes = await fcl
			.send([
				fcl.script`
      import Tribes from 0xTribes
          
      pub fun main(tenantID: Address): [Tribes.TribeData] {
          return Tribes.getAllTribes(tenantID).values
      }
      `,
				fcl.args([fcl.arg(tenantId, t.Address)]),
			])
			.then(fcl.decode);

		return allTribes as TribesData[];
	} catch (error) {
		console.error(error);
	}
}

export { getAllTribes };
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
