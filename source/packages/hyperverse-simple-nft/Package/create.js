import * as fcl from '@onflow/fcl';

/**
 * Creates a package for this Smart Module.
 * Is executed only once per user.
 * @returns {Promise} transactionID
 */

async function create() {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
        import SimpleNFT from 0xSimpleNFT
        
        transaction() {
          prepare(signer: AuthAccount) {
            signer.save(<- SimpleNFT.getPackage(), to: SimpleNFT.PackageStoragePath)
            signer.link<&SimpleNFT.Package>(SimpleNFT.PackagePrivatePath, target: SimpleNFT.PackageStoragePath)
            signer.link<&SimpleNFT.Package{SimpleNFT.PackagePublic}>(SimpleNFT.PackagePublicPath, target: SimpleNFT.PackageStoragePath)
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
    return null;
  }
}

export {
  create
};