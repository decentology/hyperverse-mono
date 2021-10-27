import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

async function getNFTIDs(tenantID, account) {
  try {
    const IDs = await fcl.send([
      fcl.script`
        import SimpleNFT from 0xSimpleNFT
  
        // We could technically pass in the tenantID right away, but it makes
        // sense to do it through an address.
        
        pub fun main(tenantID: String, account: Address): [UInt64] {
        
          let accountPackage = getAccount(account)
            .getCapability(SimpleNFT.PackagePublicPath)
            .borrow<&SimpleNFT.Package{SimpleNFT.PackagePublic}>()!
      
          return accountPackage.borrowCollectionPublic(tenantID: tenantID).getIDs()
        }
      `,
      fcl.args([
        fcl.arg(tenantID, FlowTypes.String),
        fcl.arg(account, FlowTypes.Address)
      ])
    ]).then(fcl.decode);

    return IDs;
  } catch (error) {
    console.error(error);
  }
}

export {
  getNFTIDs
};