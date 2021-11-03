import * as fcl from '@onflow/fcl';

async function removePackage() {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
        import SimpleNFT from 0xSimpleNFT
        
        transaction() {
        
          prepare(signer: AuthAccount) {
            destroy signer.load<@SimpleNFT.Package>(from: SimpleNFT.PackageStoragePath)
          }
      
          execute {
            log("Signer has a SimpleNFT.Package.")
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
  removePackage
};