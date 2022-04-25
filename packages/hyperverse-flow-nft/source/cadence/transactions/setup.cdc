import ExampleNFT from "../contracts/ExampleNFT.cdc"
				
transaction() {
    prepare(signer: AuthAccount) {
        if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
          signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
          signer.link<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
        }

        if signer.borrow<&ExampleNFT.NFTMinter>(from: ExampleNFT.MinterStoragePath) == nil {
          signer.save(<- ExampleNFT.createMinter(), to: ExampleNFT.MinterStoragePath)
        }
    }
    execute {
        
    }
}