import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

async function getNFTMetadata(tenantID, account, NFTID) {
  try {
    const metadata = await fcl.send([
      fcl.script`
        import SimpleNFT from 0xSimpleNFT
  
        // We could technically pass in the tenantID right away, but it makes
        // sense to do it through an address.
        
        pub fun main(tenantID: String, account: Address, NFTID: UInt64): {String: String} {
        
          let accountPackage = getAccount(account)
            .getCapability(SimpleNFT.PackagePublicPath)
            .borrow<&SimpleNFT.Package{SimpleNFT.PackagePublic}>()!
      
          return accountPackage.borrowCollectionPublic(tenantID: tenantID).getMetadata(id: NFTID)
        }
      `,
      fcl.args([
        fcl.arg(tenantID, FlowTypes.String),
        fcl.arg(account, FlowTypes.Address),
        fcl.arg(NFTID, FlowTypes.UInt64)
      ])
    ]).then(fcl.decode);

    return metadata;
  } catch (error) {
    console.error(error);
  }
}

export {
  getNFTMetadata
};