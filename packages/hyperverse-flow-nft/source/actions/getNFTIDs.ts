const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getNFTIDs(tenantId: string, id: number, account: string) {
	try {
		const ids = await fcl.send([
			fcl.script`
				import ExampleNFT from 0xNFT
						
				pub fun main(tenantID: Address, id: UInt64, account: Address): [UInt64] {
																
						let collection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
																.borrow<&ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}>()
																?? panic("Could not borrow the ExampleNFT.Collection{ExampleNFT.ExampleNFTCollectionPublic}")
				
						return collection.getIDs()
				}
      `,
			fcl.args([
				fcl.arg(tenantId, t.Address),
				fcl.arg(id, t.UInt64),
				fcl.arg(account, t.String)
			]),
		])
			.then(fcl.decode);

		return ids;
	} catch (error) {
		console.error(error);
	}
}

export { getNFTIDs };
