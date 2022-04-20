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

        access(account) let metadata: {String: String}

        pub fun getMetadata(): {String: String} {
            return self.metadata
        }

        init(
            _ tenant: Address,
            id: UInt64,
            name: String,
            description: String,
            thumbnail: String,
            metadata: {String: String}
        ) {
            self.tenant = tenant
            self.id = id
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
            self.metadata = metadata
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
        pub fun borrowViewResolver(_ tenant: Address, id: UInt64): &AnyResource{MetadataViews.Resolver}
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

            if self.ownedNFTs[tenant] != nil {
                let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
                // add the new token to the dictionary which removes the old one
                collection[id] <-! token
            } else {
                self.ownedNFTs[tenant] <-! {id: <- token}
            }

            emit Deposit(tenant, id: id, to: self.owner?.address)
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(_ tenant: Address): [UInt64] {
            if self.ownedNFTs[tenant] != nil {
                let collection = &self.ownedNFTs[tenant] as &{UInt64: NFT}
                return collection.keys
            }
            return []
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
            metadata: {String: String}
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
                metadata: metadata
            )

            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            ExampleNFT.totalSupply[tenant] = ExampleNFT.totalSupply[tenant]! + 1
        }
    }

    pub fun createMinter(): @NFTMinter {
        return <- create NFTMinter()
    }

    init() {
        // Initialize the total supply
        self.totalSupply = {}

        // Set the named paths
        self.CollectionStoragePath = /storage/exampleNFTCollection004
        self.CollectionPublicPath = /public/exampleNFTCollection004
        self.MinterStoragePath = /storage/exampleNFTMinter004

        emit ContractInitialized()
    }
}