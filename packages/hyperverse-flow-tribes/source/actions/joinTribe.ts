// @ts-ignore
import * as fcl from '@onflow/fcl';
// @ts-ignore
import * as t from '@onflow/types';

async function joinTribe(tenantId: string, tribeName: string) {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
      import Tribes from 0xTribes
      
      transaction(tenantID: Address, tribeName: String) {
          let TribesIdentity: &Tribes.Identity
          prepare(signer: AuthAccount) {
              if signer.borrow<&Tribes.Identity>(from: Tribes.IdentityStoragePath) == nil {
                  signer.save(<- Tribes.createIdentity(), to: Tribes.IdentityStoragePath)
                  signer.link<&Tribes.Identity{Tribes.IdentityPublic}>(Tribes.IdentityPublicPath, target: Tribes.IdentityStoragePath)
              }
              
              self.TribesIdentity = signer.borrow<&Tribes.Identity>(from: Tribes.IdentityStoragePath)
                                      ?? panic("Could not borrow the Tribes.Identity")
          }
          execute {
              self.TribesIdentity.joinTribe(tenantID, tribeName: tribeName)
              log("This signer joined a Tribe.")
          }
      }
      `,
      fcl.args([
        fcl.arg(tenantId, t.Address),
        fcl.arg(tribeName, t.String)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    return fcl.tx(transactionID).onceSealed();
  } catch (error) {
    console.error(error);
  }
}

export {
  joinTribe
};