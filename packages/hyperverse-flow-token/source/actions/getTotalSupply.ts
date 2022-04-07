const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

async function getTotalSupply(tenantId: string) {
  try {
    const totalSupply = await fcl.send([
      fcl.script`
				import ExampleToken from 0xToken
						
				pub fun main(tenantID: Address): UFix64? {
						return ExampleToken.getTotalSupply(tenantID)
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
