import * as fcl from '@onflow/fcl';

async function getPackage() {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
        import SimpleNFT from 0xSimpleNFT
        
        // Will only be run 1 time per user - ever. So even if they need this
        // collection as dependencies, etc.
        transaction() {
        
          prepare(signer: AuthAccount) {
            signer.save(<- SimpleNFT.getPackage(), to: SimpleNFT.PackageStoragePath)
            signer.link<&SimpleNFT.Package>(SimpleNFT.PackagePrivatePath, target: SimpleNFT.PackageStoragePath)
            signer.link<&SimpleNFT.Package{SimpleNFT.PackagePublic}>(SimpleNFT.PackagePublicPath, target: SimpleNFT.PackageStoragePath)
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
  getPackage
};