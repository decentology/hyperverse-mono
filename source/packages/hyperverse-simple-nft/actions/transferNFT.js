import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

async function transferNFT(tenantID, recipient, NFTID) {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
        import SimpleNFT from 0xSimpleNFT

        transaction(tenantID: String, recipient: Address, withdrawID: UInt64) {

          let SignerCollection: &SimpleNFT.Collection
          let RecipientCollection: &SimpleNFT.Collection{SimpleNFT.CollectionPublic}

          prepare(signer: AuthAccount) {

            let SignerPackage = signer
              .borrow<&SimpleNFT.Package>(from: SimpleNFT.PackageStoragePath)
              ?? panic("Could not borrow the signer's SimpleNFT Package.")

            self.SignerCollection = SignerPackage.borrowCollection(tenantID: tenantID)

            let RecipientPackage = getAccount(recipient)
              .getCapability(SimpleNFT.PackagePublicPath)
              .borrow<&SimpleNFT.Package{SimpleNFT.PackagePublic}>()
              ?? panic("Could not borrow the recipient's public SimpleNFT Package.")

            self.RecipientCollection = RecipientPackage.borrowCollectionPublic(tenantID: tenantID)
          }

          execute {
            self.RecipientCollection.deposit(token: <- self.SignerCollection.withdraw(withdrawID: withdrawID))
            log("Transferred a SimpleNFT from the signer into the recipient's SimpleNFT Collection.")
          }
        }
      `,
      fcl.args([
        fcl.arg(tenantID, FlowTypes.String),
        fcl.arg(recipient, FlowTypes.Address),
        fcl.arg(Number.parseInt(NFTID), FlowTypes.UInt64)
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
  transferNFT
};