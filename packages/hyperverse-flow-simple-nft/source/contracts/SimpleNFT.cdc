import HyperverseModule from "./HyperverseModule.cdc"

pub contract SimpleNFT {

    //
    // Metadata
    //
    pub var metadata: HyperverseModule.Metadata

    //
    // Events
    //
    pub event ContractInitialized()
    pub event Withdraw(tenant: Address, id: UInt64, from: Address?)
    pub event Deposit(tenant: Address, id: UInt64, to: Address?)

    //
    // Paths
    //
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let TenantStoragePath: StoragePath
    pub let TenantPublicPath: PublicPath

    //
    // NFT
    //
    pub resource NFT {
        pub let tenant: Address
        pub let id: UInt64
        pub var metadata: {String: String}
    
        init(_ tenant: Address, _metadata: {String: String}) {
            self.id = self.uuid
            self.tenant = tenant
            self.metadata = _metadata

            SimpleNFT.borrowTenantPublic(tenant).updateTotalSupply()
        }
    }

    //
    // Collection
    //
    pub resource interface CollectionPublic {
        pub fun deposit(token: @NFT)
        pub fun getIDs(): [UInt64]
        pub fun getTenantIDs(_ tenant: Address): [UInt64]
        pub fun getMetadata(id: UInt64): {String: String}
    }

    pub resource Collection: CollectionPublic {
        access(contract) var ownedNFTs: @{UInt64: NFT}
        access(contract) var tenantMapping: {Address: [UInt64]}

        pub fun deposit(token: @NFT) {
            let id: UInt64 = token.id
            let tenant: Address = token.tenant
            emit Deposit(tenant: tenant, id: id, to: self.owner?.address)

            if self.tenantMapping[tenant] == nil {
                self.tenantMapping[tenant] = []
            }

            let arrayOfIDsForTenant: &[UInt64] = &self.tenantMapping[tenant] as &[UInt64]
            arrayOfIDsForTenant.append(id)
            self.ownedNFTs[id] <-! token
        }

        pub fun withdraw(withdrawID: UInt64): @NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")
            emit Withdraw(tenant: token.tenant, id: token.id, from: self.owner?.address)
            return <-token
        }

         pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun getTenantIDs(_ tenant: Address): [UInt64] {
            return self.tenantMapping[tenant] ?? panic("This Collection does not own NFTs from that Tenant.")
        }

        pub fun borrowNFT(id: UInt64): &NFT {
            return &self.ownedNFTs[id] as &NFT
        }

        pub fun getMetadata(id: UInt64): {String: String} {
            let ref = &self.ownedNFTs[id] as auth &NFT
            return ref.metadata
        }

        destroy() {
            destroy self.ownedNFTs
        }

        init () {
            self.ownedNFTs <- {}
            self.tenantMapping = {}
        }
    }

    pub fun createEmptyCollection(): @Collection { 
        return <- create Collection() 
    }

    //
    // Tenant
    //
    pub resource interface TenantPublic {
        pub var totalSupply: UInt64
        access(contract) fun updateTotalSupply()
    }

    pub resource Tenant: TenantPublic {
        pub var totalSupply: UInt64

        access(contract) fun updateTotalSupply() {
            self.totalSupply = self.totalSupply + 1
        }

        pub fun mintNFT(metadata: {String: String}): @NFT {
            return <- create NFT(self.owner!.address, _metadata: metadata)
        }
        
        init() {
            self.totalSupply = 0
        }
    }

    pub fun createTenant(): @Tenant {
        return <- create Tenant()
    }

    pub fun borrowTenantPublic(_ tenant: Address): &Tenant{TenantPublic} {
        return getAccount(tenant).getCapability(SimpleNFT.TenantPublicPath)
                .borrow<&Tenant{TenantPublic}>()
                ?? panic("Could not borrow the TenantPublic.")
    }

    init() {
        self.CollectionStoragePath = /storage/SimpleNFTCollection
        self.CollectionPublicPath = /public/SimpleNFTCollection
        self.TenantStoragePath = /storage/SimpleNFTTenantStoragePath
        self.TenantPublicPath = /public/SimpleNFTTenantPublicPath

        self.metadata = HyperverseModule.Metadata(
                            _identifier: self.getType().identifier,
                            _contractAddress: self.account.address,
                            _title: "SimpleNFT", 
                            _authors: [HyperverseModule.Author(_address: 0x26a365de6d6237cd, _externalURI: "https://www.decentology.com/")], 
                            _version: "0.0.1", 
                            _publishedAt: getCurrentBlock().timestamp,
                            _externalURI: ""
                        )

        emit ContractInitialized()
    }
}