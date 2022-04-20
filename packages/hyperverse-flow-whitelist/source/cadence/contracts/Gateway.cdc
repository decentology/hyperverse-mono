pub contract Gateway {

    /***********************************************/
    /******************** PATHS ********************/
    /***********************************************/

    pub let RegistryStoragePath: StoragePath
    pub let RegistryPublicPath: PublicPath

    /************************************************/
    /******************** EVENTS ********************/
    /************************************************/

    pub event ContractInitialized()

    /***********************************************/
    /******************** STATE ********************/
    /***********************************************/


    /***********************************************/
    /**************** FUNCTIONALITY ****************/
    /***********************************************/

    pub struct interface IModule {
        access(account) fun verify(_ params: {String: AnyStruct})
    }

    pub resource interface WhitelistPublic {
        pub var active: Bool
        pub let dateCreated: UFix64
        pub let description: String 
        pub let whitelistId: UInt64
        pub let host: Address
        pub let image: String 
        pub let name: String
        pub var totalCount: UInt64
        pub let url: String
        pub fun getRegistered(): [Address]
        pub fun getExtraMetadata(): {String: String}
        pub fun hasRegistered(account: Address): Bool
        pub fun getModules(): [{IModule}]
        access(account) fun register(registrant: Address, params: {String: AnyStruct})
    }

    //
    // Event
    //
    pub resource Whitelist: WhitelistPublic {
        pub var active: Bool
        access(account) var registered: {Address: Bool}
        pub let dateCreated: UFix64
        pub let description: String 
        pub let whitelistId: UInt64
        access(account) var extraMetadata: {String: String}
        pub let host: Address
        pub let image: String 
        pub let name: String
        pub var totalCount: UInt64
        pub let url: String
        pub let modules: [{IModule}]

        /***************** Setters for the Whitelist Owner *****************/

        // Toggles claiming on/off
        pub fun toggleActive(): Bool {
            self.active = !self.active
            return self.active
        }

        // Updates the metadata in case you want
        // to add something. Not currently used for anything
        // on Whitelist, so it's empty.
        pub fun updateMetadata(newExtraMetadata: {String: String}) {
            self.extraMetadata = newExtraMetadata
        }

        /***************** Getters (all exposed to the public) *****************/

        pub fun getRegistered(): [Address] {
            return self.registered.keys
        }

        pub fun hasRegistered(account: Address): Bool {
            return self.registered[account] != nil
        }

        pub fun getExtraMetadata(): {String: String} {
            return self.extraMetadata
        }

        pub fun getModules(): [{IModule}] {
            return self.modules
        }

        /****************** Registering ******************/

        pub fun register(registrant: Address, params: {String: AnyStruct}) {
            pre {
                self.active: 
                    "This Whitelist is not registerable, and thus not currently active."
            }

            params["whitelist"] = &self as &Whitelist{WhitelistPublic}
            
            for module in self.modules {
                module.verify(params)
            }

            self.registered[registrant] = true
            self.totalCount = self.totalCount + 1
        }

        init (
            _active: Bool,
            _description: String, 
            _extraMetadata: {String: String},
            _host: Address, 
            _image: String, 
            _name: String,
            _url: String,
            _modules: [{IModule}],
        ) {
            self.active = _active
            self.dateCreated = getCurrentBlock().timestamp
            self.description = _description
            self.whitelistId = self.uuid
            self.extraMetadata = _extraMetadata
            self.host = _host
            self.image = _image
            self.name = _name
            self.registered = {}
            self.totalCount = 0
            self.url = _url
            self.modules = _modules
        }

        destroy() {
           
        }
    }
 
    // 
    // Registry
    //
    pub resource interface RegistryPublic {
        // Public Getters
        pub fun borrowPublicWhitelistRef(whitelistId: UInt64): &Whitelist{WhitelistPublic}
        pub fun getIDs(): [UInt64]
    }

    pub resource Registry: RegistryPublic {
        access(account) var whitelists: @{UInt64: Whitelist}

        // Create a new Whitelist.
        pub fun createWhitelist(
            active: Bool,
            description: String,
            image: String, 
            name: String, 
            url: String,
            modules: [{IModule}],
            _ extraMetadata: {String: String}
        ): UInt64 {
            let Whitelist <- create Whitelist(
                _active: active,
                _description: description, 
                _extraMetadata: extraMetadata,
                _host: self.owner!.address, 
                _image: image, 
                _name: name, 
                _url: url,
                _modules: modules
            )
            let whitelistId = Whitelist.whitelistId
            self.whitelists[Whitelist.whitelistId] <-! Whitelist
            return whitelistId
        }

        pub fun deleteWhitelist(whitelistId: UInt64) {
            let whitelist <- self.whitelists.remove(key: whitelistId) ?? panic("This whitelist does not exist")
            destroy whitelist
        }

        pub fun borrowWhitelistRef(whitelistId: UInt64): &Whitelist {
            return &self.whitelists[whitelistId] as &Whitelist
        }

        /************* Getters (for anyone) *************/

        // Get a public reference to the Whitelist
        // so you can call some helpful getters
        pub fun borrowPublicWhitelistRef(whitelistId: UInt64): &Whitelist{WhitelistPublic} {
            return &self.whitelists[whitelistId] as &Whitelist{WhitelistPublic}
        }

        pub fun getIDs(): [UInt64] {
            return self.whitelists.keys
        }

        pub fun register(whitelist: &Whitelist{WhitelistPublic}, params: {String: AnyStruct}) {
            let registrant = self.owner!.address
            params["registrant"] = registrant
            whitelist.register(registrant: registrant, params: params)
        }

        init() {
            self.whitelists <- {}
        }

        destroy() {
            destroy self.whitelists
        }
    }

    pub fun createEmptyRegistry(): @Registry {
        return <- create Registry()
    }

    init() {
        emit ContractInitialized()

        self.RegistryStoragePath = /storage/GatewayRegistryStoragePath002
        self.RegistryPublicPath = /public/GatewayRegistryPublicPath002
    }
}