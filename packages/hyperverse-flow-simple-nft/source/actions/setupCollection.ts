const fcl = require("@onflow/fcl");
import { FlowTransaction } from '../types';

async function setupCollection() {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
      import SimpleNFT from 0xSimpleNFT

      transaction {

        prepare(acct: AuthAccount) {
          acct.save(<- SimpleNFT.createEmptyCollection(), to: SimpleNFT.CollectionStoragePath)
          acct.link<&SimpleNFT.Collection{SimpleNFT.CollectionPublic}>(SimpleNFT.CollectionPublicPath, target: SimpleNFT.CollectionStoragePath)
        }

        execute {
          log("Setup new Collection.")
        }
      }
      `,
      fcl.args([]),
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
  setupCollection
};