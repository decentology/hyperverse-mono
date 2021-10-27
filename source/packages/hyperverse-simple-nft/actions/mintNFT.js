import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

async function mintNFT(tenantID, recipient, name) {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
      import SimpleNFT from 0xSimpleNFT

      transaction(tenantID: String, recipient: Address, name: String) {
      
        let SimpleNFTMinter: &SimpleNFT.NFTMinter
        let RecipientCollection: &SimpleNFT.Collection{SimpleNFT.CollectionPublic}
    
        prepare(signer: AuthAccount) {
    
          let SignerSimpleNFTPackage = signer
            .borrow<&SimpleNFT.Package>(from: SimpleNFT.PackageStoragePath)
            ?? panic("Could not borrow the signer's SimpleNFT.Package.")
  
          self.SimpleNFTMinter = SignerSimpleNFTPackage.borrowMinter(tenantID: tenantID)
  
          let RecipientSimpleNFTPackage = getAccount(recipient)
            .getCapability(SimpleNFT.PackagePublicPath)
            .borrow<&SimpleNFT.Package{SimpleNFT.PackagePublic}>()
            ?? panic("Could not borrow the recipient's SimpleNFT.Package.")
          self.RecipientCollection = RecipientSimpleNFTPackage.borrowCollectionPublic(tenantID: tenantID)
        }
    
        execute {
          let nft <- self.SimpleNFTMinter.mintNFT(metadata: {"name": name}) 
          self.RecipientCollection.deposit(token: <-nft)
          log("Minted a SimpleNFT into the recipient's SimpleNFT Collection.")
        }
      }
      `,
      fcl.args([
        fcl.arg(tenantID, FlowTypes.String),
        fcl.arg(recipient, FlowTypes.Address),
        fcl.arg(name, FlowTypes.String)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    return transactionID;
  } catch (error) {
    console.error(error);
  }
}

export {
  mintNFT
};