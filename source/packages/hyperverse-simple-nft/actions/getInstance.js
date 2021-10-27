import * as fcl from '@onflow/fcl';

async function getInstance() {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
        import SimpleNFT from 0xSimpleNFT

        transaction() {
          
          let SNFTPackage: &SimpleNFT.Package
      
          prepare(signer: AuthAccount) {
            // Get a reference to the signer's SimpleNFT.Package
            self.SNFTPackage = signer
              .borrow<&SimpleNFT.Package>(from: SimpleNFT.PackageStoragePath)
              ?? panic("Could not get the SimpleNFT.Package from the signer.")
          }
      
          execute {
            self.SNFTPackage.instance(tenantID: self.SNFTPackage.uuid)
            log("Create a new instance of a Tenant using your Package as a key.")
          }
        }
      `,
      fcl.args([]),
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
  getInstance
};