const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getTotalSupply(tenantId: string) {
  try {
    const totalSupply = await fcl.send([
      fcl.script`
				import ExampleNFT from 0xNFT
						
				pub fun main(tenantID: Address): UInt64? {
						return ExampleNFT.totalSupply[tenantID]
				}
      `,
      fcl.args([
        fcl.arg(tenantId, t.Address)
      ]),
    ]).then(fcl.decode);
    return totalSupply || 0;
  } catch (error) {
    console.error(error);
  }
}

export { getTotalSupply };
