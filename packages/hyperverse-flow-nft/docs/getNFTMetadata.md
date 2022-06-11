# Get NFT Metadata

<p> The `getNFTMetadata` function from the **Flow NFT Module** returns an NFTs metadata. </p>

---

<br>

### getNFTMetadata

<p> The `getNFTMetadata` function takes in the tenant ID, the id associated with the specified NFT, and the account. </p>

```jsx
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getNFTMetadata(tenantId: string, id: number, account: string) {
    try {
        const metadata = await fcl.send([
            fcl.script`
            import ExampleNFT from 0xNFT
            import MetadataViews from 0x631e88ae7f1d7c20
                
            pub fun main(tenantID: Address, id: UInt64, account: Address): MetadataViews.Display? {
                                    
                let collection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                    .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                                    ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
            
                if let resolver = collection.borrowViewResolver(id: id) {
                    if let view = resolver.resolveView(Type<MetadataViews.Display>()) {
                        return view as! Metadata
                    }
                }
            
                return nil
            }
            `,
            fcl.args([
                fcl.arg(tenantId, t.Address),
                fcl.arg(id, t.UInt64),
                fcl.arg(account, t.Address)
            ]),
        ]).then(fcl.decode);

        return metadata;
    } catch (error) {
        console.error(error);
    }
}

export { getNFTMetadata };
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
