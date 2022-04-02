import HyperverseModule from "./HyperverseModule.cdc"

pub contract RandomPick {

    pub let metadata: HyperverseModule.Metadata

    pub fun randomPick(values: [AnyStruct]): AnyStruct {
        let randomNum = Int(unsafeRandom())
        return values[randomNum % (values.length)]
    }

    init() {
        self.metadata = HyperverseModule.Metadata(
                            _identifier: self.getType().identifier,
                            _contractAddress: self.account.address,
                            _contractName: "RandomPick", 
                            _authors: [HyperverseModule.Author(_address: 0x26a365de6d6237cd, _externalLink: "https://www.decentology.com/")], 
                            _version: "0.0.1", 
                            _publishedAt: getCurrentBlock().timestamp,
                            _externalUri: "FILL IN LINK TO TRIBES EXPLANATION"
                        )
    }
}