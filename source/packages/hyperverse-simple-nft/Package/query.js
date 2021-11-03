import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

async function query(account) {
  try {
    const tenantID = await fcl.send([
      fcl.script`
        import SimpleNFT from 0xSimpleNFT
        
        pub fun main(address: Address): String? {
        
          let package = getAccount(address)
            .getCapability(SimpleNFT.PackagePublicPath)
            .borrow<&SimpleNFT.Package{SimpleNFT.PackagePublic}>()

          if package == nil {
            return nil
          } else {
            return address.toString().concat(".").concat(package!.uuid.toString())
          }
        }
      `,
      fcl.args([
        fcl.arg(account, FlowTypes.Address)
      ])
    ]).then(fcl.decode);

    return tenantID;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export {
  query
};