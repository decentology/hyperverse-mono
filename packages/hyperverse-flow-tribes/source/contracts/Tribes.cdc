import HyperverseModule from "./HyperverseModule.cdc"

pub contract Tribes {

    //
    // Metadata
    //
    pub var metadata: HyperverseModule.Metadata

    //
    // Events
    //
    pub event TribesContractInitialized()

    //
    // Paths
    //
    pub let IdentityStoragePath: StoragePath
    pub let IdentityPublicPath: PublicPath
    pub let TenantStoragePath: StoragePath
    pub let TenantPublicPath: PublicPath

    // 
    // Identity
    //
    pub resource interface IdentityPublic {
        pub fun currentTribeName(_ tenant: Address): String?
    }

    pub resource Identity: IdentityPublic {
        // Maps a Tenant address to the tribe you're in
        access(contract) var datas: {Address: String}

        pub fun joinTribe(_ tenant: Address, tribeName: String) {
            pre {
                self.datas[tenant] == nil:
                    "You already belong to a Tribe in this Tenant!"
            }
        
            let me = self.owner!.address

            let tenantPublic = getAccount(tenant).getCapability(Tribes.TenantPublicPath)
                                .borrow<&Tenant{TenantPublic}>()
                                ?? panic("There exists no Identity Public here.")
            tenantPublic.join(tribeName: tribeName, user: me)

             self.datas.insert(key: tenant, tribeName)
        }

        pub fun leaveTribe(_ tenant: Address) {
            pre {
                self.datas[tenant] != nil:
                    "You don't belong to a Tribe in this Tenant."
            }
    
            let me = self.owner!.address
            
            let tenantPublic = getAccount(tenant).getCapability(Tribes.TenantPublicPath)
                                .borrow<&Tenant{TenantPublic}>()
                                ?? panic("There exists no Identity Public here.")
            

            
            self.datas.remove(key: tenant)
        }

        pub fun currentTribeName(_ tenant: Address): String? {
            return self.datas[tenant]
        }

        init() {
            self.datas = {}
        }
    }

    pub fun createIdentity(): @Identity { 
        return <- create Identity() 
    }

    //
    // TribeData
    //
    pub struct TribeData {
        pub let name: String
        pub let ipfsHash: String
        pub var description: String
        access(contract) var members: {Address: Bool}

        pub fun getMembers(): [Address] {
            return self.members.keys
        }

        access(contract) fun addMember(member: Address) {
            self.members[member] = true
        }

        access(contract) fun removeMember(member: Address) {
            self.members.remove(key: member)
        }

        init(_name: String, _ipfsHash: String, _description: String) {
            self.name = _name
            self.ipfsHash = _ipfsHash
            self.description = _description
            self.members = {}
        }
    }

    //
    // Tenant
    //
    pub resource interface TenantPublic {
        pub fun getAllTribes(): {String: TribeData}
        pub fun getTribeData(tribeName: String): TribeData
        access(contract) fun join(tribeName: String, user: Address)
        access(contract) fun leave(user: Address)
    }

    pub resource Tenant: TenantPublic {
        access(contract) var tribes: {String: TribeData}
        access(contract) var participants: {Address: String}

        //
        // To be called by the Tenant
        //
        
        pub fun addNewTribe(newTribeName: String, ipfsHash: String, description: String) {
            pre {
                self.tribes[newTribeName] == nil:
                    "A Tribe with this name already exists!"
            }
            self.tribes[newTribeName] = TribeData(_name: newTribeName, _ipfsHash: ipfsHash, _description: description)
        }

        //
        // To be called by the contract
        //

        access(contract) fun join(tribeName: String, user: Address) {
            pre {
                self.participants[user] == nil:
                    "User already belongs to a Tribe!"
                self.tribes[tribeName] != nil:
                    "This Tribe does not exist!"
            }
            
            let tribeData = &self.tribes[tribeName]! as &TribeData
            tribeData.addMember(member: user)
            self.participants.insert(key: user, tribeName)
        }

        access(contract) fun leave(user: Address) {
            pre {
                self.participants[user] != nil:
                    "User does not belong to a Tribe!"
            }

            let usersTribe = self.participants[user]!
            let tribeData = &self.tribes[usersTribe]! as &TribeData
            tribeData.removeMember(member: user)
            self.participants.remove(key: user)
        }

        //
        // To be called publically
        //

        pub fun getAllTribes(): {String: TribeData} {
            return self.tribes
        }

        pub fun getTribeData(tribeName: String): TribeData {
            return self.tribes[tribeName]!
        }

        init() {
            self.tribes = {}
            self.participants = {}
        }
    }

    pub fun createTenant(): @Tenant {
        return <- create Tenant()
    }

    init() {
        self.metadata = HyperverseModule.Metadata(
                            _identifier: self.getType().identifier,
                            _contractAddress: self.account.address,
                            _contractName: "Tribes", 
                            _authors: [HyperverseModule.Author(_address: 0x26a365de6d6237cd, _externalLink: "https://www.decentology.com/")], 
                            _version: "0.0.1", 
                            _publishedAt: getCurrentBlock().timestamp,
                            _externalUri: "FILL IN LINK TO TRIBES EXPLANATION"
                        )

        self.TenantStoragePath = /storage/TribesTenantStoragePath
        self.TenantPublicPath = /public/TribesTenantPublicPath
        self.IdentityStoragePath = /storage/TribesIdentityStoragePath
        self.IdentityPublicPath = /public/TribesIdentityPublicPath

        emit TribesContractInitialized()
    }
}