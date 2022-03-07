const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function transferNFT(tenantId: string, recipient: string, withdrawID: number) {
    try {
        const transactionID = await fcl.send([
            fcl.transaction`
            import ExampleNFT from 0xNFT
            
            transaction(tenantId: Address, recipient: Address, withdrawID: UInt64) {
                let Collection: ExampleNFT.Collection
                let Recipient: &ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}
                prepare(signer: AuthAccount) {
                    self.Collection = signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
										?? panic("Could not borrow the ExampleNFT.Collection")
                    self.Recipient = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                                        .borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
                                                        ?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
                }
                execute {
                    let nft <- self.Collection.withdraw(tenantId, withdrawID: withdrawID)
                    self.Recipient.deposit(token: <- nft)
                }
            }
            `,
            fcl.args([
                fcl.arg(tenantId, t.Address),
                fcl.arg(recipient, t.Address),
                fcl.arg(withdrawID, t.UInt64)
            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999),
        ]).then(fcl.decode);

        return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
    } catch (error) {
        console.error(error);
    }
}

export { transferNFT };
