import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

async function getAllTribes(tenantId: string) {
  tenantId = "0x1960ff14acc51991";
  try {
    const allTribes = await fcl.send([
      fcl.script`
      import Tribes from 0xTribes
          
      pub fun main(tenantID: Address): [Tribes.TribeData] {
          return Tribes.getAllTribes(tenantID).values
      }
      `,
      fcl.args([
        fcl.arg(tenantId, t.Address)
      ])
    ]).then(fcl.decode);

    return allTribes;
  } catch (error) {
    console.error(error);
  }
}

export {
  getAllTribes
};