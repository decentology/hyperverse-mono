import ExampleNFT from "../contracts/ExampleNFT.cdc"
						
pub fun main(tenantID: Address, account: Address): [UInt64] {
                        
    let collection = getAccount(account).getCapability(ExampleNFT.CollectionPublicPath)
                        .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                        ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")

    return collection.getIDs(tenantID)
}