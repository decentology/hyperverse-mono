const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '../types';

async function mintNFT(recipient: string, name: string, description: string, thumbnail: string, metadata: any) {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
				import ExampleNFT from 0xNFT

				transaction(recipient: Address, name: String, description: String, thumbnail: String) {
						let Minter: &ExampleNFT.Minter
						let Recipient: &ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}
						prepare(signer: AuthAccount) {
								self.Minter = signer.borrow<&ExampleNFT.Minter>(from: ExampleNFT.MinterStoragePath)
																				?? panic("Could not borrow the ExampleNFT.Minter")
								self.Recipient = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
																	.borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
																	?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
						}
						execute {
								self.Minter.mintNFT(recipient: self.Recipient, name: name, description: description, thumbnail: thumbnail, metadata: {})
						}
				}
      `,
			fcl.args([
				fcl.arg(recipient, t.Address),
				fcl.arg(name, t.String),
				fcl.arg(description, t.String),
				fcl.arg(thumbnail, t.String)
			]),
			fcl.payer(fcl.authz),
			fcl.proposer(fcl.authz),
			fcl.authorizations([fcl.authz]),
			fcl.limit(9999),
		])
			.then(fcl.decode);

		return fcl.tx(transactionID).onceSealed() as Promise<FlowTransaction>;
	} catch (error) {
		console.error(error);
	}
}

export { mintNFT };
