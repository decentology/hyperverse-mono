const fcl = require("@onflow/fcl");
const t = require("@onflow/types");
import { SimpleNFTMetadata } from "../types";

async function getMetadata(account: string) {
  try {
    const nftMetadata = await fcl.send([
      fcl.script`
      import SimpleNFT from 0xSimpleNFT

      pub fun main(account: Address, id: UInt64): {String: String} {
        let collection = getAccount(account).getCapability(SimpleNFT.CollectionPublicPath)
                              .borrow<&SimpleNFT.Collection{SimpleNFT.CollectionPublic}>()
                              ?? panic("Could not borrow the public Collection from the recipient.")

        return collection.getMetadata(id: id)
      }
      `,
      fcl.args([
        fcl.arg(account, t.Address)
      ])
    ]).then(fcl.decode);

    return nftMetadata as SimpleNFTMetadata;
  } catch (error) {
    console.error(error);
  }
}

export {
  getMetadata
};