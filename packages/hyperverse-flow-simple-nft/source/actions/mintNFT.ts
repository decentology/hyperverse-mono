const fcl = require("@onflow/fcl");
const t = require("@onflow/types");
import { FlowTransaction } from '..';

async function mintNFT(recipient: string) {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
      import SimpleNFT from 0xSimpleNFT

      transaction(recipient: Address) {

        let Tenant: &SimpleNFT.Tenant
        let RecipientCollection: &SimpleNFT.Collection{SimpleNFT.CollectionPublic}

        prepare(acct: AuthAccount) {
        self.Tenant = acct.borrow<&SimpleNFT.Tenant>(from: SimpleNFT.TenantStoragePath) ?? panic("Could not borrow the Tenant from the signer.")
        self.RecipientCollection = getAccount(recipient).getCapability(SimpleNFT.CollectionPublicPath)
                                          .borrow<&SimpleNFT.Collection{SimpleNFT.CollectionPublic}>()
                                          ?? panic("Could not borrow the public Collection from the recipient.")
        }

        execute {
          self.RecipientCollection.deposit(token: <- self.Tenant.mintNFT(metadata: {"name": "Jacob Tucker"}))
          log("Minted an NFT.")
        }
      }
      `,
      fcl.args([
        fcl.arg(recipient, t.Address)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
  } catch (error) {
    console.error(error);
  }
}

export {
  mintNFT
};