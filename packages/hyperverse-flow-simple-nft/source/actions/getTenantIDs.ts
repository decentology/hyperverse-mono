const fcl = require("@onflow/fcl");
const t = require("@onflow/types");

async function getTenantIDs(tenantId: string, account: string) {
  try {
    const tenantIDsInCollection = await fcl.send([
      fcl.script`
      import SimpleNFT from 0xSimpleNFT

      pub fun main(account: Address, tenant: Address): [UInt64] {
        let collection = getAccount(account).getCapability(SimpleNFT.CollectionPublicPath)
                              .borrow<&SimpleNFT.Collection{SimpleNFT.CollectionPublic}>()
                              ?? panic("Could not borrow the public Collection from the recipient.")

        return collection.getTenantIDs(tenant)
      }
      `,
      fcl.args([
        fcl.arg(account, t.Address),
        fcl.arg(tenantId, t.Address)
      ])
    ]).then(fcl.decode);

    return tenantIDsInCollection as Number[];
  } catch (error) {
    console.error(error);
  }
}

export {
  getTenantIDs
};