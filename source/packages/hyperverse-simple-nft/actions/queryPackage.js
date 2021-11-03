import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

async function queryPackage(tenantID, account) {
  console.log(account);
  try {
    const hasPackage = await fcl.send([
      fcl.script`
        import SimpleNFT from 0xSimpleNFT
        
        pub fun main(account: Address): String? {
        
          let package = getAccount(account)
            .getCapability(SimpleNFT.PackagePublicPath)
            .borrow<&SimpleNFT.Package{SimpleNFT.PackagePublic}>()

          if package == nil {
            return nil
          } else {
            return account.toString().concat(".").concat(package!.uuid.toString())
          }
        }
      `,
      fcl.args([
        fcl.arg(account, FlowTypes.Address)
      ])
    ]).then(fcl.decode);

    return hasPackage;
  } catch (error) {
    console.error(error);
  }
}

export {
  queryPackage
};