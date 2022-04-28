# Create Whitelist

<p> The `createWhitelist` function from `useWhitelist` creates a new whitelist.</p>

---

<br>

### createWhitelist

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function createWhitelist() {
    try {
        const transactionID = await fcl.send([
            fcl.transaction`
            import Gateway from 0xGateway
            import GatewayModules from 0xGateway
            
            transaction(active: Bool, name: String, description: String, image: String, url: String, tokenPaths: [PublicPath], amounts: [UFix64], identifiers: [String]) {

                let Registry: &Gateway.Registry
              
                prepare(acct: AuthAccount) {
                  // set up the Registry where users will store all their created events
                  if acct.borrow<&Gateway.Registry>(from: Gateway.RegistryStoragePath) == nil {
                    acct.save(<- Gateway.createEmptyRegistry(), to: Gateway.RegistryStoragePath)
                    acct.link<&Gateway.Registry{Gateway.RegistryPublic}>(Gateway.RegistryPublicPath, target: Gateway.RegistryStoragePath)
                  }
              
                  self.Registry = acct.borrow<&Gateway.Registry>(from: Gateway.RegistryStoragePath)
                                      ?? panic("Could not borrow the Registry from the signer.")
                }
              
                execute {
                  let modules: [{Gateway.IModule}] = []
                  var i = 0
                  while i < identifiers.length {
                    modules.append(GatewayModules.OwnsToken(_path: tokenPaths[i], amount: amounts[i], identifier: identifiers[i]))
                    i = i + 1
                  }
                  self.Registry.createWhitelist(active: active, description: description, image: image, name: name, url: url, modules: modules, {})
                  log("Started a new event.")
                }
              }
            `,
            fcl.args([

            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999),
        ]).then(fcl.decode);

        return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
    } catch (error) {
        console.error(error);
    }
}

export { createWhitelist };
```

### Main UI Component

```jsx

```

### Args

<p> </p>

```jsx

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)