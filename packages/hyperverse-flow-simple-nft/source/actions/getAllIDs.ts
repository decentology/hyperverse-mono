const fcl = require("@onflow/fcl");
const t = require("@onflow/types");

async function getAllIDs(account: string) {
  try {
    const allIDsInCollection = await fcl.send([
      fcl.script`
      import SimpleNFT from 0xSimpleNFT

      pub fun main(account: Address): [UInt64] {
        let collection = getAccount(account).getCapability(SimpleNFT.CollectionPublicPath)
                              .borrow<&SimpleNFT.Collection{SimpleNFT.CollectionPublic}>()
                              ?? panic("Could not borrow the public Collection from the recipient.")

        return collection.getIDs()
      }
      `,
      fcl.args([
        fcl.arg(account, t.Address)
      ])
    ]).then(fcl.decode);

    return allIDsInCollection as Number[];
  } catch (error) {
    console.error(error);
  }
}

export {
  getAllIDs
};