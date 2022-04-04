pub contract HyperverseModule {

    pub struct Metadata {
        pub var identifier: String
        pub var contractAddress: Address
        pub var contractName: String
        pub var authors: [Author]
        pub var version: String
        pub var publishedAt: UFix64
        pub var externalURI: String

        init(
            _identifier: String,
            _contractAddress: Address,
            _contractName: String, 
            _authors: [Author], 
            _version: String, 
            _publishedAt: UFix64,
            _externalURI: String
        ) {
            self.identifier = _identifier
            self.contractAddress = _contractAddress
            self.contractName = _contractName
            self.authors = _authors
            self.version = _version
            self.publishedAt = _publishedAt
            self.externalURI = _externalURI
        }
    }

    pub struct Author {
        pub var address: Address
        pub var externalURI: String

        init(_address: Address, _externalURI: String) {
            self.address = _address
            self.externalURI = _externalURI
        }
    }

} 