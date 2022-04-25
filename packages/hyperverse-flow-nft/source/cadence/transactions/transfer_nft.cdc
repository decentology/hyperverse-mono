import ExampleNFT from "../contracts/ExampleNFT.cdc"
            
transaction(tenantId: Address, recipient: Address, withdrawID: UInt64) {
    let Collection: &ExampleNFT.Collection
    let Recipient: &ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}
    prepare(signer: AuthAccount) {
        self.Collection = signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
        ?? panic("Could not borrow the ExampleNFT.Collection")
        self.Recipient = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                            .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                                            ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
    }
    execute {
        let nft <- self.Collection.withdraw(tenantId, withdrawID: withdrawID)
        self.Recipient.deposit(token: <- nft)
    }
}