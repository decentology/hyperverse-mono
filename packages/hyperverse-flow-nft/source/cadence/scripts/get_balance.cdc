import ExampleNFT from "../contracts/ExampleNFT.cdc"
						
pub fun main(tenantID: Address, account: Address): Int {  
    let collection = getAccount(account).getCapability(ExampleNFT.CollectionPublicPath)
                        .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                        ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")

    return collection.getIDs(tenantID).length
}