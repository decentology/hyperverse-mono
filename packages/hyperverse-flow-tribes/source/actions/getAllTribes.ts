const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { TribesData } from '../types';

async function getAllTribes(tenantId: string) {
	console.log('in get all tribes');
	console.log(tenantId);
	try {
		console.log('in the try')
		const allTribes = await fcl
			.send([
				fcl.script`
      import Tribes from 0xTribes
          
      pub fun main(tenantID: Address): [Tribes.TribeData] {
          return Tribes.getAllTribes(tenantID).values
      }
      `,
	  
				fcl.args([fcl.arg(tenantId, t.Address)]),
			])
			.then(fcl.decode);

		return allTribes as TribesData[];
	} catch (error) {
		console.error(error);
	}
}

export { getAllTribes };
