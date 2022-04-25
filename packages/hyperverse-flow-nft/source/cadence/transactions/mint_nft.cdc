import ExampleNFT from "../contracts/ExampleNFT.cdc"

transaction(recipient: Address, name: String, description: String, thumbnail: String) {
    let Minter: &ExampleNFT.NFTMinter
    let Recipient: &ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}
    prepare(signer: AuthAccount) {
        self.Minter = signer.borrow<&ExampleNFT.NFTMinter>(from: ExampleNFT.MinterStoragePath)
                                ?? panic("Could not borrow the ExampleNFT.Minter")
        self.Recipient = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                          .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                          ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
    }
    execute {
        self.Minter.mintNFT(recipient: self.Recipient, name: name, description: description, thumbnail: thumbnail, metadata: {})
    }
}