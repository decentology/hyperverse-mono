// This is an example implementation of a Flow Non-Fungible Token
// It is not part of the official standard but it assumed to be
// very similar to how many NFTs would implement the core functionality.

import MetadataViews from "./MetadataViews.cdc"

pub contract ExampleNFT {

    pub var totalSupply: {Address: UInt64}

    pub event ContractInitialized()
    pub event Withdraw(_ tenant: Address, id: UInt64, from: Address?)
    pub event Deposit(_ tenant: Address, id: UInt64, to: Address?)

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    pub resource NFT: MetadataViews.Resolver {
        pub let id: UInt64
        pub let tenant: Address

        pub let name: String
        pub let description: String
        pub let thumbnail: String

        init(
            _ tenant: Address,
            id: UInt64,
            name: String,
            description: String,
            thumbnail: String,
        ) {
            self.tenant = tenant
            self.id = id
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
        }
    
        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: MetadataViews.HTTPFile(
                            url: self.thumbnail
                        )
                    )
            }

            return nil
        }
    }

    pub resource interface ExampleNFTCollectionPublic {
        pub fun deposit(token: @NFT)
        pub fun getIDs(_ tenant: Address): [UInt64]
        pub fun borrowNFT(_ tenant: Address, id: UInt64): &NFT
        pub fun borrowExampleNFT(_ tenant: Address, id: UInt64): &ExampleNFT.NFT? {
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow ExampleNFT reference: the ID of the returned reference is incorrect"
            }
        }
    }

    pub resource Collection: ExampleNFTCollectionPublic {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{Address: {UInt64: NFT}}

        init () {
            self.ownedNFTs <- {}
        }

        // withdraw removes an NFT from the collection and moves it to the caller
        pub fun withdraw(_ tenant: Address, withdrawID: UInt64): @NFT {
            let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
            let token <- collection.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(tenant, id: token.id, from: self.owner?.address)

            return <-token
        }

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NFT) {
            let token <- token as! @ExampleNFT.NFT

            let tenant: Address = token.tenant
            let id: UInt64 = token.id

            let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
            // add the new token to the dictionary which removes the old one
            let oldToken <- collection[id] <- token

            emit Deposit(tenant, id: id, to: self.owner?.address)

            destroy oldToken
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(_ tenant: Address): [UInt64] {
            let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
            return collection.keys
        }

        // borrowNFT gets a reference to an NFT in the collection
        // so that the caller can read its metadata and call its methods
        pub fun borrowNFT(_ tenant: Address, id: UInt64): &NFT {
            let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
            return &collection[id] as &NFT
        }
 
        pub fun borrowExampleNFT(_ tenant: Address, id: UInt64): &ExampleNFT.NFT? {
            let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
            if collection[id] != nil {
                // Create an authorized reference to allow downcasting
                let ref = &collection[id] as auth &NFT
                return ref as! &ExampleNFT.NFT
            }

            return nil
        }

        pub fun borrowViewResolver(_ tenant: Address, id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
            let nft = &collection[id] as auth &NFT
            let exampleNFT = nft as! &ExampleNFT.NFT
            return exampleNFT as &AnyResource{MetadataViews.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // public function that anyone can call to create a new empty collection
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    // Resource that an admin or something similar would own to be
    // able to mint new NFTs
    //
    pub resource NFTMinter {

        // mintNFT mints a new NFT with a new ID
        // and deposit it in the recipients collection using their collection reference
        pub fun mintNFT(
            recipient: &Collection{ExampleNFTCollectionPublic},
            name: String,
            description: String,
            thumbnail: String,
        ) {
            let tenant = self.owner!.address
            if ExampleNFT.totalSupply[tenant] == nil {
                ExampleNFT.totalSupply[tenant] = 0
            }
            // create a new NFT
            var newNFT <- create NFT(
                tenant,
                id: ExampleNFT.totalSupply[tenant]!,
                name: name,
                description: description,
                thumbnail: thumbnail,
            )

            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            ExampleNFT.totalSupply[tenant] = ExampleNFT.totalSupply[tenant]! + 1
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = {}

        // Set the named paths
        self.CollectionStoragePath = /storage/exampleNFTCollection
        self.CollectionPublicPath = /public/exampleNFTCollection
        self.MinterStoragePath = /storage/exampleNFTMinter

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: self.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()
        self.account.save(<-minter, to: self.MinterStoragePath)

        emit ContractInitialized()
    }
}