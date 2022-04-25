import ExampleNFT from "../contracts/ExampleNFT.cdc"
import MetadataViews from "../contracts/MetadataViews.cdc"
    
pub fun main(tenantID: Address, id: UInt64, account: Address): MetadataViews.Display? {
                        
  let collection = getAccount(account).getCapability(ExampleNFT.CollectionPublicPath)
                      .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                      ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")

  let resolver = collection.borrowViewResolver(tenantID, id: id) 
  if let view = resolver.resolveView(Type<MetadataViews.Display>()) {
      return view as! MetadataViews.Display
  }

  return nil
}