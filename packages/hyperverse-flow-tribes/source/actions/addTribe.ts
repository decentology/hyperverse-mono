const fcl = require("@onflow/fcl");
const t = require("@onflow/types");
import { FlowTransaction } from '..';

async function addTribe(newTribeName: string, ipfsHash: string, description: string) {
  try {
    const transactionID = await fcl.send([
      fcl.transaction`
      import Tribes from 0xTribes
      
      transaction(newTribeName: String, ipfsHash: String, description: String) {

        let TribesAdmin: &Tribes.Admin
    
        prepare(tenantOwner: AuthAccount) {
            self.TribesAdmin = tenantOwner.borrow<&Tribes.Admin>(from: Tribes.AdminStoragePath)!
        }
    
        execute {
            self.TribesAdmin.addNewTribe(newTribeName: newTribeName, ipfsHash: ipfsHash, description: description)
            log("This admin has added a new tribe to join.")
        }
    }
      `,
      fcl.args([
        fcl.arg(newTribeName, t.String),
        fcl.arg(ipfsHash, t.String),
        fcl.arg(description, t.String)
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
  addTribe
};