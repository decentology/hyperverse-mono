const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { FlowTransaction } from '..';

async function setup() {
	try {
		const transactionID = await fcl.send([
			fcl.transaction`
				import ExampleNFT from 0xNFT
				import MetadataViews from 0x631e88ae7f1d7c20
				
				transaction() {
						prepare(signer: AuthAccount) {
								if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
									signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
								  signer.link<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
								}

								if signer.borrow<&ExampleNFT.Minter>(from: ExampleNFT.MinterStoragePath) == nil {
									signer.save(<- ExampleNFT.createMinter(), to: ExampleNFT.MinterStoragePath)
								}
						}
						execute {
								
						}
				}
      `,
			fcl.args([]),
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

export { setup };
